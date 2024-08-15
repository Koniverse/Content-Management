/**
 * chain service
 */

import {factories} from '@strapi/strapi';

export default factories.createCoreService('api::chain.chain', ({strapi}) => ({
  async customList(params={}) {
    const _data = await strapi.entityService.findMany('api::chain.chain', {
      populate: {
        'icon': true,
        'providers': true,
        'evmInfo': true,
        'substrateInfo': true,
        'extraInfo': true,
        'bitcoinInfo': true,
        'tonInfo': true,
        'crowdloanFunds': {
          fields: ['relayChain', 'fundId', 'paraId', 'status', 'startTime', 'endTime', 'auctionIndex', 'firstPeriod', 'lastPeriod'],
        }
      },
      sort: 'ordinal:asc,id:asc',
      ...params
    })
    const data = !Array.isArray(_data) ? [_data] : _data

    data.forEach((d) => {
      d.icon = d.icon?.url || null;
      // Fill crowdloanFunds
      // @ts-ignore
      d.crowdloanFunds && d.crowdloanFunds.forEach((f) => {
        delete f.id;
      })
      if (d.substrateInfo) {
        //@ts-ignore
        d.substrateInfo.crowdloanFunds = d.crowdloanFunds;
      }
      delete d.crowdloanFunds;
      // cleanIds
      delete d.id;
      d.substrateInfo && delete d.substrateInfo.id;
      d.evmInfo && delete d.evmInfo.id;
      d.tonInfo && delete d.tonInfo.id;
      d.bitcoinInfo && delete d.bitcoinInfo.id;
      // @ts-ignore
      d.providers = Object.fromEntries(d.providers.filter(p => !p.disable).map((p) => [p.name, p.url]));
      d.extraInfo && delete d.extraInfo.id;
    })

    return data;
  }
}));
