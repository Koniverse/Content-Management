/**
 * dapp service
 */

import {factories} from '@strapi/strapi';

export default factories.createCoreService('api::dapp.dapp', ({strapi}) => ({
  async customList(params= {}) {
    const data = await strapi.entityService.findMany('api::dapp.dapp', {
      populate: ['icon', 'preview_image', 'category_rels', 'chains'],
      sort: 'ordinal:asc,id:asc',
      ...params
    })

    data.forEach((d) => {
      d.icon = d.icon?.url || d.icon;
      d.preview_image = d.preview_image?.url || d.preview_image;
      d.categories = d.category_rels.map((c) => c.slug);
      // @ts-ignore
      d.chains = d.chains.map((c) => c.slug);
    })

    return data;
  }
}));
