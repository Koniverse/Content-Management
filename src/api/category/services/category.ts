/**
 * category service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::category.category', ({strapi}) => ({
  async customList(params= {}) {
    const data = await strapi.entityService.findMany('api::category.category', {
      sort: 'id:asc',
      ...params
    })

    return data;
  }
}));
