/**
 * chain service
 */

import {factories} from '@strapi/strapi';

export default factories.createCoreService('api::chain.chain', ({strapi}) => ({
  async customList(params={}) {
    const data = await strapi.entityService.findMany('api::chain.chain', {
      populate: ['icon', 'providers', 'evmInfo', 'substrateInfo'],
      sort: 'ordinal:asc,id:asc',
      ...params
    })

    data.forEach((d) => {
      d.icon = d.icon.url;
      // @ts-ignore
      d.providers = Object.fromEntries(d.providers.map((p) => [p.name, p.url]));
    })

    return data;
  }
}));
