/**
 * A set of functions called "actions" for `listing`
 */

export default {
  getEnabled: async (ctx, next) => {
    const { strapi: Strapi } = ctx;
    const pluralId = ctx.params.pluralId as string;
    const data = await strapi.service(`api::listing.github-action`).getEnabled(pluralId);
    ctx.body = data;
  },
  executed: async (ctx, next) => {
    const { strapi: Strapi } = ctx;
    const pluralId = ctx.params.pluralId as string;
    const data = await strapi.service(`api::listing.github-action`).executed(pluralId);
    ctx.body = data;
  }
};
