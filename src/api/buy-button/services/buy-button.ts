/**
 * buy-button service
 */

import { factories } from '@strapi/strapi';


export default factories.createCoreService('api::buy-button.buy-button', ({strapi}) => ({
  async customList(params = {}) {
    return await strapi.entityService.findMany('api::buy-button.buy-button', {
      sort: 'version:asc',
      ...params
    });
  }
}));

