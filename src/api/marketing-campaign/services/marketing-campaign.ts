/**
 * marketing-campaign service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::marketing-campaign.marketing-campaign', ({strapi}) => ({
  async customList(params={}) {
    const _data = await strapi.entityService.findMany('api::marketing-campaign.marketing-campaign', {
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
    const data = !Array.isArray(_data) ? [_data] : _data

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

