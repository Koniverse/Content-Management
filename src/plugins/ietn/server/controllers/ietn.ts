import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async find(ctx) {
    try {

      ctx.body = await strapi.plugin("ietn").service("ietn").find();
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async post(ctx) {
    try {
      const { data } = ctx.request.body;
      ctx.body = await strapi.plugin("ietn").service("ietn").post(data);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async update(ctx) {
    try {
      const {record,id} = ctx.request.body;
      ctx.body = await strapi.plugin('ietn').service("ietn").update(record,id)
    } catch (error) {
      ctx.throw(500, error);
    }
  },
});
