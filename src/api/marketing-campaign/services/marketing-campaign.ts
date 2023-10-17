/**
 * marketing-campaign service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::marketing-campaign.marketing-campaign', ({strapi}) => ({
  async customList(params={}) {
    const data = await strapi.entityService.findMany('api::marketing-campaign.marketing-campaign', {
      populate: {
        'banners': {
          populate: ['buttons', 'media']
        },
        'notifications': {
          populate: ['buttons']
        }
      },
      sort: 'id:asc',
      ...params
    })

    data.forEach((d) => {
      // @ts-ignore
      d.banners = d.banners.map((b) => {
        // delete b.id;
        b.media = b.media?.url || b.media;

        b.buttons.forEach((btn) => {
          delete btn.id;
        });

        return b;
      });

      d.notifications.forEach((n) => {
        // delete n.id;

        n.buttons.forEach((btn) => {
          delete btn.id;
        });
      });
    })

    return data;
  }
}));

