/**
 * version-buy service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::version-buy.version-buy', ({strapi}) => ({
  async customList(params = {}) {
    return await strapi.entityService.findMany('api::version-buy.version-buy', {
      sort: 'version:asc',
      ...params
    });
  }
}));
