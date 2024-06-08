/**
 * mobile-feature service
 */

import {factories} from '@strapi/strapi';

export default factories.createCoreService('api::mobile-feature.mobile-feature', ({strapi}) => ({
  async customList(params = {}) {
    return await strapi.entityService.findMany('api::mobile-feature.mobile-feature', {
      sort: 'version:asc',
      ...params
    });
  }
}));

