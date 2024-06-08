/**
 * app-change-log service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::app-change-log.app-change-log', ({strapi}) => ({
  async customList(params = {}) {
    const _data = await strapi.entityService.findMany('api::app-change-log.app-change-log', {
      sort: 'id:asc',
      populate: {
        'media': true,
        'info': true,
        'buttons': {
          populate: {
            'instruction': {
              populate: '*',
              ...params
            },
            'action': true,
          }
        }
      },
      ...params
    })
    const data = !Array.isArray(_data) ? [_data] : _data

    data.forEach((d) => {
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
      })
    })

    return data
  }
}));

