/**
 * A set of functions called "actions" for `listing`
 */

export default {
  getEnabled: async (ctx, next) => {
    const { strapi: Strapi } = ctx;
    const {apiID, uid, roles} = ctx.request.body;
    ctx.body = await strapi.service(`api::listing.github-action`).getEnabled(apiID, uid, roles);
  },
  executed: async (ctx, next) => {
    const { strapi: Strapi } = ctx;
    const {apiID, uid, roles} = ctx.request.body;
    ctx.body = await strapi.service(`api::listing.github-action`).executed(apiID, uid, roles);
  }
};
