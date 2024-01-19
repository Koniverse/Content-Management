/**
 * A set of functions called "actions" for `listing`
 */

export default {
  listAll: async (ctx, next) => {
    try {
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
      } else if (pluralId === 'chain-asset') {
        result = await strapi.service('api::chain-asset.chain-asset').customList(generalParams);
      }  else if (pluralId === 'multi-chain-asset') {
        result = await strapi.service('api::multi-chain-asset.multi-chain-asset').customList(generalParams);
      } else if (pluralId === 'category') {
        result = await strapi.service('api::category.category').customList(generalParams);
      } else if (pluralId === 'airdrop-campaign') {
        result = await strapi.service('api::airdrop-campaign.airdrop-campaign').customList(generalParams);
      } else if (pluralId === 'crowdloan-fund') {
        result = await strapi.service('api::crowdloan-fund.crowdloan-fund').customList(generalParams);
      } else if (pluralId === 'marketing-campaign') {
        result = await strapi.service('api::marketing-campaign.marketing-campaign').customList(generalParams);
      } else if (pluralId === 'share-preview') {
        result = await strapi.service('api::share-preview.share-preview').customList(generalParams);
      } else if (pluralId === 'buy-token-config') {
        result = await strapi.service('api::buy-token-config.buy-token-config').customList(generalParams);
      } else if (pluralId === 'buy-service-info') {
        result = await strapi.service('api::buy-service-info.buy-service-info').customList(generalParams);
      } else if (pluralId === 'instruction') {
        result = await strapi.service('api::instruction.instruction').customList(generalParams);
      } else if (pluralId === 'change-log') {
        result = await strapi.service('api::change-log.change-log').customList(generalParams);
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
  },
  triggerAutoFetch: async (ctx, next) => {
    const pluralId = ctx.params.pluralId as string;
    if (pluralId === 'crowdloan-fund') {
      await strapi.service('api::crowdloan-fund.crowdloan-fund').autoGetFunds();
      ctx.body = `Fetch api::crowdloan-fund.crowdloan-fund from Subscan`
    } else {
      ctx.body = 'Not Found'
    }
  }
};
