/**
 * instruction service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::instruction.instruction', ({strapi}) => ({
  async customList(params= {}) {
    const data = await strapi.entityService.findMany('api::instruction.instruction', {
      populate: ['instructions', 'media'],
      sort: 'group:asc,slug:asc',
      ...params
    });
    data.forEach((d) => {
      d.media = d.media?.url || d.media;
    });

    return data;
  }
}));
