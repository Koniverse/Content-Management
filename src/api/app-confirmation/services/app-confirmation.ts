/**
 * app-confirmation service
 */

import {factories} from '@strapi/strapi';

const SLUG_IN_ATTRIBUTE = ['chain', 'chain_asset'];
export default factories.createCoreService('api::app-confirmation.app-confirmation', ({strapi}) => ({
  async customList(params = {}) {
    const data = await strapi.entityService.findMany('api::app-confirmation.app-confirmation', {
      sort: 'id:asc',
      populate: {
        'conditions': {
          populate: '*',
          ...params
        }
      },
      ...params
    })
    data.forEach((d) => {
      const conditions = {};
      d.conditions.forEach((b) => {
        const {__component} = b;
        const componentSplit = __component.split('.');
        if (componentSplit.length > 1) {
          const componentName = componentSplit[1];
          if (!conditions[componentName]) {
            conditions[componentName] = [];
          }
          for (const att of SLUG_IN_ATTRIBUTE) {
            if (b[att]) {
              b[att] = b[att].slug;
            }
          }
          b.__component && delete b.__component;
          conditions[componentName].push(b);
        }
      })
      // @ts-ignore
      d.conditions = conditions;
    })
    return data
  }
}));
