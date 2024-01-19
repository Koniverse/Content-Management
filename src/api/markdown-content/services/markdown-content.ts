/**
 * markdown-content service
 */

import {factories} from '@strapi/strapi';

export default factories.createCoreService('api::markdown-content.markdown-content', ({strapi}) => ({
  async customList(params = {}) {
    const data = await strapi.entityService.findMany('api::markdown-content.markdown-content', {
      sort: 'folder:asc',
      populate: {
      localizations: {
        fields: ['folder', 'id', 'locale', 'content', 'description'],
      },
    },
      locale: 'en',
      ...params
    })

    return data;
  }
}));
