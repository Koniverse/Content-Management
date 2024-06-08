/**
 * dapp service
 */

import {factories} from '@strapi/strapi';

export default factories.createCoreService('api::dapp.dapp', ({strapi}) => ({
  async customList(params= {}) {
    const _data = await strapi.entityService.findMany('api::dapp.dapp', {
      populate: ['icon', 'preview_image', 'category_rels', 'chains'],
      sort: 'ordinal:asc,id:asc',
      ...params
    })
    const data = !Array.isArray(_data) ? [_data] : _data

    data.forEach((d) => {
      d.icon = d.icon?.url || d.icon;
      d.preview_image = d.preview_image?.url || d.preview_image;
      // @ts-ignore
      d.categories = d.category_rels.map((c) => c.slug);
      delete d.category_rels;
      // @ts-ignore
      d.chains = d.chains.map((c) => c.slug);
    })

    return data;
  }
}));
