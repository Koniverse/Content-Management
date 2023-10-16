import {Event} from "@strapi/database/lib/lifecycles";
import { errors } from "@strapi/utils";

async function getChainSlugFromID(chainID: number) {
  const chain = await strapi.entityService.findOne('api::chain.chain', chainID,{})

  return chain?.slug
}

async function getChainSlugExisted(chainAssetID: number) {
  const existed = await strapi.entityService.findOne('api::chain-asset.chain-asset', chainAssetID,{ populate: ['originChain'] })

  return existed?.originChain.slug
}

async function validateSlug(data: any) {
    const chainSlug = data.originChain.connect.length > 0 ? await getChainSlugFromID(data.originChain.connect[0].id) : await getChainSlugExisted(data?.id)

    const expectedSlug = `${chainSlug}-${data.assetType}-${data.symbol}`

    if (data.slug !== expectedSlug && !data.slug.startsWith(`${expectedSlug}-`)) {
      throw new errors.ValidationError(`Slug must be "${expectedSlug}" or starts with "${expectedSlug}-"`, {});
    }
}

export default {
  beforeCreate: async (event: Event) => {
    await validateSlug(event.params.data);
  },
  beforeUpdate: async (event: Event) => {
    await validateSlug(event.params.data);
  }
};
