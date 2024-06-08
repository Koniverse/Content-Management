/**
 * airdrop-campaign service
 */

import {factories} from '@strapi/strapi';

export default factories.createCoreService('api::airdrop-campaign.airdrop-campaign', ({strapi}) => ({
  async customList(params = {}) {
    let data = await strapi.entityService.findMany('api::airdrop-campaign.airdrop-campaign', {
      populate: ['logo', 'backdrop_image', 'chains'],
      sort: 'ordinal:asc,id:asc',
      ...params
    })
    if (!Array.isArray(data)) {
      data = [data];
    }

    data.forEach((d) => {
      // @ts-ignore
      d.chains = d.chains?.map((c) => (c.slug)) || [];
      d.logo = d.logo?.url || d.logo;
      d.backdrop_image = d.backdrop_image?.url || d.backdrop_image;
    })

    data.forEach((d) => {
      // @ts-ignore
      d.chains = d.chains?.map((c) => (c.slug)) || [];
      d.logo = d.logo?.url || d.logo;
      d.backdrop_image = d.backdrop_image?.url || d.backdrop_image;
    })

    return data;
  }
}));
