/**
 * app-popup service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::app-popup.app-popup', ({strapi}) => ({
  async customList(params = {}) {
    const data = await strapi.entityService.findMany('api::app-popup.app-popup', {
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
    data.forEach((d) => {
      d.media = d.media?.url || d.media;
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

