/**
 * i18n controller
 */

import { createCoreController } from "@strapi/strapi/dist/factories";

// export default factories.createCoreController('api::i18n-v2.i18n-v2');
module.exports = createCoreController("api::i18n.i18n", ({ strapi }) => ({
  async langEn(ctx) {
    const {params} = ctx;
    const result = await strapi.service('api::i18n.i18n').langEn(params.id)
    return result;
  },
  async langRu(ctx) {
    const {params} = ctx;
    const result = await strapi.service('api::i18n.i18n').langRu(params.id)
    return result;
  },
  async langZh(ctx) {
    const {params} = ctx;
    const result = await strapi.service('api::i18n.i18n').langZh(params.id)
    return result;
  },

}));
