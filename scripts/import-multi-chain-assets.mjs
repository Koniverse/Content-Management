import insertMap from './inputs/multi-chain-assets/insert.json' assert { type: "json" };
import rawAssetMap from './inputs/chain-assets/insert.json' assert { type: "json" };
import {getItems, insertItem, updateItem} from "./strapi-api.mjs";
import {fetchByFolder} from "./fetch-upload.mjs";

const logos = await fetchByFolder('chain-assets');
const logoMap = {}
logos.forEach(logo => {
  logoMap[logo.name] = parseInt(logo.id);
});

const assetsMap = {}
const assets = await getItems('chain-assets');
assets.forEach(assets => {
  assetsMap[assets.attributes.slug] = assets.id;
});

const multiChainMapping = {}
Object.entries(rawAssetMap).forEach(([slug, item]) => {
  if (item.multiChainAsset) {
    multiChainMapping[item.multiChainAsset] = multiChainMapping[item.multiChainAsset] || []
    multiChainMapping[item.multiChainAsset].push(assetsMap[slug]);
  }
});

const existedMap = {}
const existed = await getItems('multi-chain-assets');
existed.forEach(item => {
  existedMap[item.attributes.slug] = item.id;
});


Object.entries(insertMap).forEach(([slug, item]) => {
  const {multiChainAsset, ...itemData} = item;
  const finalRecord = {
    ...itemData,
    originChainAsset: assetsMap[item.originChainAsset],
    icon: logoMap[item.icon] ? [logoMap[item.icon]] : null,
    chainAssets: multiChainMapping[slug],
    slug
  };

  if (existedMap[slug]) {
    updateItem('multi-chain-assets', existedMap[slug], finalRecord).catch(console.error);
  } else {
    insertItem('multi-chain-assets', finalRecord).catch(console.error);
  }
});
