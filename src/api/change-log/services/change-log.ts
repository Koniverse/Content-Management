/**
 * change-log service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::change-log.change-log', ({strapi}) => ({
  async customList(params= {}) {
    const data = await strapi.entityService.findMany('api::change-log.change-log', {
      sort: 'product:asc,version:desc',
      ...params
    })

    return data;
  }
}));
