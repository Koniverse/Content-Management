/**
 * buy-service-info service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::buy-service-info.buy-service-info', ({strapi}) => ({
  async customList(params = {}) {
    const data = await strapi.entityService.findMany('api::buy-service-info.buy-service-info', {
      sort: 'id:asc',
      ...params
    })

    return data
  }
}));
