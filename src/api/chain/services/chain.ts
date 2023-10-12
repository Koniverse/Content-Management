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
        'substrateInfo': true
      },
      sort: 'ordinal:asc,id:asc',
      ...params
    })

    data.forEach((d) => {
      d.icon = d.icon.url;
      delete d.id;
      d.substrateInfo && delete d.substrateInfo.id;
      d.evmInfo && delete d.evmInfo.id;
      // @ts-ignore
      d.providers = Object.fromEntries(d.providers.map((p) => [p.name, p.url]));
    })

    return data;
  }
}));
