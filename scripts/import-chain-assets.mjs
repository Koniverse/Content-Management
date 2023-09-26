import insertMap from './inputs/chain-assets/insert.json' assert { type: "json" };
import assetRef from './inputs/chain-assets/asset-ref.json' assert { type: "json" };
import {getItems, insertItem, updateItem} from "./strapi-api.mjs";
import {fetchByFolder} from "./fetch-upload.mjs";

const logos = await fetchByFolder('chain-assets');
const logoMap = {}
logos.forEach(logo => {
  logoMap[logo.name] = logo.id;
});

const chainMap = {}
const chain = await getItems('chains');
chain.forEach(chain => {
  chainMap[chain.attributes.slug] = chain.id;
});

const existedMap = {}
const existed = await getItems('chain-assets');
existed.forEach(item => {
  existedMap[item.attributes.slug] = item.id;
});

const reftMap = {}
Object.values(assetRef).forEach((item)=> {
  const target = existedMap[item.destAsset];
  if (target) {
    reftMap[item.srcAsset] = reftMap[item.srcAsset] || [];
    reftMap[item.srcAsset].push({
      type: item.path,
      destAsset: target
    });
  }
})



Object.entries(insertMap).forEach(([slug, item]) => {
  const {multiChainAsset, ...itemData} = item;
  const finalRecord = {
    ...itemData,
    originChain: chainMap[item.originChain],
    icon: logoMap[item.icon] ? [parseInt(logoMap[item.icon])] : null,
    assetRefs: reftMap[slug],
    slug
  };

  if (existedMap[slug]) {
    updateItem('chain-assets', existedMap[slug], {icon: finalRecord.icon, assetRefs: finalRecord.assetRefs}).catch(console.error);
  } else {
    insertItem('chain-assets', finalRecord).catch(console.error);
  }
});
