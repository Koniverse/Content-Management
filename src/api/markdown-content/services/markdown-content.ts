/**
 * markdown-content service
 */

import {factories} from '@strapi/strapi';

export default factories.createCoreService('api::markdown-content.markdown-content', ({strapi}) => ({
  async customList(params = {}) {
    const data = await strapi.entityService.findMany('api::markdown-content.markdown-content', {
      'locale': 'all',
      sort: 'folderName:asc',
      ...params
    })
    const result = data.reduce((data, value) => {
      if (!data[value.folderName]) {
        data[value.folderName] = []
      }

      value.createdAt !== undefined && delete value.createdAt;
      value.updatedAt !== undefined && delete value.updatedAt;
      value.publishedAt !== undefined && delete value.publishedAt;
      data[value.folderName].push(value)
      return data
    }, {})

    return result;
  }
}));
