/**
 * i18n service
 */
"use strict";
import { createCoreService } from "@strapi/strapi/dist/factories";

// export default factories.createCoreService('api::i18n-v2.i18n-v2');
module.exports = createCoreService("api::i18n.i18n", ({ strapi }) => ({
  langEn(id_i18n: number) {
    return strapi.entityService.findMany("api::i18n.i18n", {
      filters: { id: id_i18n },
      populate: ["en"],
    });
  },
  langRu(id_i18n: number) {
    return strapi.entityService.findMany("api::i18n.i18n", {
      filters: { id: id_i18n },
      populate: ["ru"],
    });
  },
  langZh(id_i18n: number) {
    return strapi.entityService.findMany("api::i18n.i18n", {
      filters: { id: id_i18n },
      populate: ["zh"],
    });
  },
}));
