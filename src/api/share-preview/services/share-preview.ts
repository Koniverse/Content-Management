/**
 * share-preview service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::share-preview.share-preview', ({strapi}) => ({
  async customList(params= {}) {
    const data = await strapi.entityService.findMany('api::share-preview.share-preview', {
      sort: 'id:asc',
      populate: ['preview_image', 'fallback_image'],
      ...params
    })

    return data;
  }
}));
