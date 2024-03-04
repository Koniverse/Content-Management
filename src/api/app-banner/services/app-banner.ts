/**
 * app-banner service
 */

import {factories} from '@strapi/strapi';

const SLUG_IN_ATTRIBUTE = ['chain', 'chain_asset'];
export default factories.createCoreService('api::app-banner.app-banner', ({strapi}) => ({
  async customList(params = {}) {
    console.log('app-banner service customList')
    const data = await strapi.entityService.findMany('api::app-banner.app-banner', {
      sort: 'id:asc',
      populate: {
        'media': true,
        'info': true,
        'action': true,
        'conditions': {
          populate: '*',
          ...params
        },
        'instruction': {
          populate: {
            'instruction': {
              populate: '*',
              ...params
            },
          }
        }
      },
      ...params
    })


    data.forEach((d) => {
      d.media = d.media?.url || d.media;
      if (d.instruction?.instruction) {
        // @ts-ignore
        d.instruction.instruction_id = d.instruction.instruction.id;
        // @ts-ignore
        d.instruction.group = d.instruction.instruction.group;
        // @ts-ignore
        d.instruction.slug = d.instruction.instruction.slug;
        delete d.instruction.instruction;
      }
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

