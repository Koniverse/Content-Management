/**
 * multi-chain-asset service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::multi-chain-asset.multi-chain-asset', ({strapi}) => ({
  async customList(params={}) {
    const data = await strapi.entityService.findMany('api::multi-chain-asset.multi-chain-asset', {
      populate: {
        'icon': true,
        'originChainAsset': {fields: ['slug']},
        'chainAssets': {fields: ['slug']}
      },
      sort: 'id:asc',
      ...params
    })

    data.forEach((d) => {
      delete d.id;
      d.icon = d.icon?.url || null;
      // @ts-ignore
      d.originChainAsset = d.originChainAsset?.slug || null;
      // @ts-ignore
      d.chainAssets = d.chainAssets.map((a) => {
        return a.slug;
      });
    })

    return data;
  }
}));
