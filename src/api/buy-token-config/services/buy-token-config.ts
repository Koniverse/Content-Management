/**
 * buy-token-config service
 */

import {factories} from '@strapi/strapi';

export default factories.createCoreService('api::buy-token-config.buy-token-config', ({strapi}) => ({
  async customList(params = {}) {
    const _data = await strapi.entityService.findMany('api::buy-token-config.buy-token-config', {
      populate: {
        'chain_asset': {
          populate: ['originChain']
        },
        'services': true
      },
      sort: 'ordinal:asc,id:asc',
      ...params
    })
    const data = !Array.isArray(_data) ? [_data] : _data

    return data.map((d) => {
      const {slug, originChain, symbol} = d.chain_asset;
      const serviceInfo = Object.fromEntries(d.services.map((s) => (
        [s.service, {
          network: s.network,
          symbol: s.symbol,
          isSuspended: s.isSuspended,
        }]
      )));

      return {
        serviceInfo,
        network: d.chain_asset.originChain.slug,
        slug,
        symbol,
        support: d.support
      }
    })
  }
}));
