/**
 * crowdloan-fund service
 */

import {factories} from '@strapi/strapi';
import {Subscan} from "../../../utils";
import {Input} from "@strapi/types/dist/modules/entity-service/params/data";

export interface FundItem {
  fund_id: string,
  para_id: number,
  status: number
}

type FundInput = Input<'api::crowdloan-fund.crowdloan-fund'>

const STATUS_MAP: Record<number, 'in_auction' | 'won' | 'withdraw' | 'failed'> = {
  1: 'in_auction',
  2: 'won',
  3: 'withdraw',
  4: 'failed',
}

export default factories.createCoreService('api::crowdloan-fund.crowdloan-fund', ({strapi}) => ({
  async autoGetFunds() {
    const relayChains: FundInput['relayChain'][] = ['polkadot', 'kusama'];
    for (const relayChain of relayChains) {
      try {
        // Get existed crowdloan funds from database
        const existed = await strapi.entityService.findMany('api::crowdloan-fund.crowdloan-fund', {
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
          const fundDetail: FundInput = {
            relayChain: relayChain,
            paraId: fund.para_id,
            fundId: fund.fund_id,
            status: STATUS_MAP[fund.status] || 'failed',
            metadata: fund,
            publishedAt: new Date()
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
