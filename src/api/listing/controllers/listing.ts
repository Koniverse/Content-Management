/**
 * A set of functions called "actions" for `listing`
 */

export default {
  listAll: async (ctx, next) => {
    try {
      const { strapi: Strapi } = ctx;
      const pluralId = ctx.params.pluralId as string;
      const showPreview = ctx.query?.preview;

      const generalParams = {
        publicationState: showPreview ? 'preview' : 'live',
      }

      let result = [];
      if (pluralId === 'chain') {
          result = await strapi.service('api::chain.chain').customList(generalParams);
      } else if (pluralId === 'dapp') {
          result = await strapi.service('api::dapp.dapp').customList(generalParams);
      }  else if (pluralId === 'category') {
          result = await strapi.service('api::category.category').customList(generalParams);
      } else if (pluralId === 'airdrop-campaign') {
          result = await strapi.service('api::airdrop-campaign.airdrop-campaign').customList(generalParams);
      }

      // remove some fields
      if (result.length) {
        result.forEach((r) => {
          r.createdAt !== undefined && delete r.createdAt;
          r.updatedAt !== undefined && delete r.updatedAt;
          r.publishedAt !== undefined && delete r.publishedAt;
        })
      }

      ctx.body = result;
    } catch (err) {
      ctx.body = err;
    }
  }
};
