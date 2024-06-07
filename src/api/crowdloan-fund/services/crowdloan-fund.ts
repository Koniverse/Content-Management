/**
 * crowdloan-fund service
 */

import {factories} from '@strapi/strapi';
import {Subscan} from "../../../utils";
import {Input} from "@strapi/types/dist/modules/entity-service/params/data";

export interface FundItem {
  "fund_id": string,
  "bid_id": string,
  "para_id": number,
  "first_period": number,
  "last_period": number,
  "auction_index": number,
  "owner": string,
  "cap": string,
  "end_block": number,
  "end_lease_block": number,
  "raised": number,
  "balance": number,
  "status": number,
  "start_block": number,
  "start_block_at": number,
  "last_change_block": number,
  "last_change_event_idx": number,
  "last_change_timestamp": number,
  "extrinsic_index": string,
  "contributors": number,
  "fund_auction_status": number,
  [key: string]: any;
}

type FundInput = Input<'api::crowdloan-fund.crowdloan-fund'>

const STATUS_MAP: Record<number, 'in_auction' | 'won' | 'withdraw' | 'failed'> = {
  1: 'in_auction',
  2: 'won',
  3: 'withdraw',
  4: 'failed',
}

const periodMs = 12 * 7 * 24 * 60 * 60 * 1000;
const periodKMs = 6 * 7 * 24 * 60 * 60 * 1000;
const RELAY_DATE_MAP = {
  polkadot: (new Date('2021-12-21T01:48:00')).getTime() - (6 * periodMs),
  kusama: (new Date('2021-09-08T04:27:00')).getTime() - (15 * periodKMs),
}

const RELAY_BLOCK_MAP = {
  polkadot: 16*24*7*60*60,
  kusama: 16*24*7*60*60,
}

function computeTime(relayChain: 'polkadot' | 'kusama', period: number):Date {
  const pMs = relayChain === 'polkadot' ? periodMs : periodKMs;
  const timestamp = RELAY_DATE_MAP[relayChain] + period * pMs;

  return new Date(timestamp);
}

export default factories.createCoreService('api::crowdloan-fund.crowdloan-fund', ({strapi}) => ({
  async customList(params={}) {
    const data = await strapi.entityService.findMany('api::crowdloan-fund.crowdloan-fund', {
      populate: ['chain'],
      sort: 'id:asc',
      ...params
    })

    data.forEach((d) => {
      // @ts-ignore
      d.chain = d.chain?.slug || d.chain;
    })

    return data;
  },
  async autoGetFunds() {
    const relayChains: FundInput['relayChain'][] = ['polkadot', 'kusama'];
    for (const relayChain of relayChains) {
      try {
        // Get existed crowdloan funds from database
        const existed = await strapi.entityService.findMany('api::crowdloan-fund.crowdloan-fund', {
          sort: 'id:asc',
          filters: {
            relayChain: relayChain as 'polkadot' | 'kusama'
          }
        })
        const existedMap = Object.fromEntries(existed.map((e) => [e.fundId, e]));

        // Fetch from subscan
        const fundList = await Subscan.getList<FundItem>({
          network: relayChain,
          api: 'parachain/funds',
          key: "funds",
          method: 'POST',
          data: {}
        })

        // Upsert data
        for (const fund of fundList) {
          // @ts-ignore
          const fundDetail: FundInput = {
            relayChain: relayChain,
            paraId: fund.para_id,
            fundId: fund.fund_id,
            status: STATUS_MAP[fund.status] || 'failed',
            auctionIndex: fund.auction_index,
            firstPeriod: fund.first_period,
            lastPeriod: fund.last_period,
            startTime: computeTime(relayChain, fund.first_period),
            endTime: computeTime(relayChain, fund.last_period + 1),
            metadata: fund,
            publishedAt: new Date(),
          }

          fund.end_lease_block = fund['end_block'] + RELAY_BLOCK_MAP[relayChain];

          if (fund.fund_auction_status === 2) {
            fundDetail.status = STATUS_MAP[2];
          }

          const existedRecord = existedMap[fund.fund_id];
          if (existedRecord) {
            await strapi.entityService.update('api::crowdloan-fund.crowdloan-fund', existedRecord.id, {
              data: fundDetail,
            })
          } else {
            await strapi.entityService.create('api::crowdloan-fund.crowdloan-fund', {
              data: fundDetail,
            })
          }
        }
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}));
