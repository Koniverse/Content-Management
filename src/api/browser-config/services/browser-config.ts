/**
 * browser-config service
 */

import {factories} from '@strapi/strapi';

export default factories.createCoreService('api::browser-config.browser-config', ({strapi}) => ({
  async customList(params = {}) {
    const _data =  await strapi.entityService.findMany('api::browser-config.browser-config', {
      sort: 'id:asc',
      ...params
    });
    const data = !Array.isArray(_data) ? [_data] : _data

    return Object.fromEntries(data.map((item) => [item.name, item.value]))
  }
}));
