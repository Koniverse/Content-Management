/**
 * chain-asset service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::chain-asset.chain-asset', ({strapi}) => ({
  async customList(params={}) {
    const _data = await strapi.entityService.findMany('api::chain-asset.chain-asset', {
      populate: {
        'icon': true,
        'originChain': {fields: ['slug']},
        'multiChainAsset': {fields: ['slug']},
        'assetRefs': {
          populate: {
            'destAsset': {fields: ['slug']},
          }
        }
      },
      sort: 'ordinal:asc,id:asc',
      ...params
    })
    const data = !Array.isArray(_data) ? [_data] : _data

    data.forEach((d) => {
      delete d.id;
      d.icon = d.icon?.url || null;
      // @ts-ignore
      d.originChain = d.originChain?.slug || null;
      // @ts-ignore
      d.multiChainAsset = d.multiChainAsset?.slug || null;
      // @ts-ignore
      d.assetRefs = d.assetRefs.map((a) => {
        return {
          type: a.type,
          metadata: a.metadata,
          disable: a.disable || false,
          destAsset: a.destAsset?.slug || null,
        }
      });
    })

    return data;
  }
}));
