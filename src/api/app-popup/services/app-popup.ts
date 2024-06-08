/**
 * app-popup service
 */

import { factories } from '@strapi/strapi';
const SLUG_IN_ATTRIBUTE = ['chain', 'chain_asset'];

export default factories.createCoreService('api::app-popup.app-popup', ({strapi}) => ({
  async customList(params = {}) {
    const _data = await strapi.entityService.findMany('api::app-popup.app-popup', {
      sort: 'id:asc',
      populate: {
        'media': true,
        'position_params': true,
        'info': true,
        'buttons': {
          populate: {
            'instruction': {
              populate: '*',
              ...params
            },
            'action': true,
          }
        },
        'conditions': {
          populate: '*',
          ...params
        }
      },
      ...params
    })
    const data = !Array.isArray(_data) ? [_data] : _data

    data.forEach((d) => {
      d.media = d.media?.url || d.media;

      d.position_params.forEach((f) => {
        f.id && delete f.id;
      })
      d.buttons.forEach((b) => {
        if (b.instruction?.instruction) {
          // @ts-ignore
          b.instruction.instruction_id = b.instruction.instruction.id;
          // @ts-ignore
          b.instruction.group = b.instruction.instruction.group;
          // @ts-ignore
          b.instruction.slug = b.instruction.instruction.slug;
          delete b.instruction.instruction;
        }
      });
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
          b.id && delete b.id;
          conditions[componentName].push(b);
        }
      })
      // @ts-ignore
      d.conditions = conditions;
    })

    return data
  }
}));

