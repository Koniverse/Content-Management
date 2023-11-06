/**
 * chain service
 */

import {factories} from '@strapi/strapi';

export default factories.createCoreService('api::chain.chain', ({strapi}) => ({
  async customList(params={}) {
    const data = await strapi.entityService.findMany('api::chain.chain', {
      populate: {
        'icon': true,
        'providers': true,
        'evmInfo': true,
        'substrateInfo': true,
        'extraInfo': true,
        'crowdloanFunds': {
          fields: ['relayChain', 'fundId', 'paraId', 'status', 'startTime', 'endTime', 'auctionIndex', 'firstPeriod', 'lastPeriod'],
        }
      },
      sort: 'ordinal:asc,id:asc',
      ...params
    })

    data.forEach((d) => {
      d.icon = d.icon?.url || null;
      // Fill crowdloanFunds
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
      // @ts-ignore
      d.providers = Object.fromEntries(d.providers.map((p) => [p.name, p.url]));
      d.extraInfo && delete d.extraInfo.id;
    })

    return data;
  }
}));
