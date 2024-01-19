/**
 * instruction service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::instruction.instruction', ({strapi}) => ({
  async customList(params= {}) {
    const data = await strapi.entityService.findMany('api::instruction.instruction', {
      populate: ['instructions'],
      sort: 'group:asc,slug:asc',
      ...params
    })

    return data;
  }
}));
