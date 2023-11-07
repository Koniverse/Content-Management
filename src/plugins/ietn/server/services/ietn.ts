import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async find() {
    return await strapi.entityService?.findMany("api::i18n.i18n", {
      fields: ['key'],
      populate: ["en", "vi", "zh", "ja", "ru"],
    })
  },
  async post(record) {
    return await strapi.entityService?.create("api::i18n.i18n", {
      data: record
    })
  },
  async update(record, id) {
    return await strapi.entityService?.update("api::i18n.i18n",id,{
      data: record
    })
  }
});

