import insertMap from './inputs/chains/insert.json' assert { type: "json" };
import {getItems, insertItem, updateItem} from "./strapi-api.mjs";
import {fetchByFolder} from "./fetch-upload.mjs";

const logos = await fetchByFolder('chains');
const logoMap = {}
logos.forEach(logo => {
  logoMap[logo.name] = logo.id;
});

const existedMap = {}
const existed = await getItems('chains');
existed.forEach(chain => {
  existedMap[chain.attributes.slug] = chain.id;
});

Object.entries(insertMap).forEach(([slug, item]) => {
  const finalRecord = {
    ...item,
    providers: Object.entries(item.providers).map(([name, url]) => ({name, url})),
    icon: logoMap[item.icon] ? [parseInt(logoMap[item.icon])] : null,
    slug
  };

  if (existedMap[slug]) {
    updateItem('chains', existedMap[slug], {icon: finalRecord.icon}).catch(console.error);
  } else {
    insertItem('chains', finalRecord).catch(console.error);
  }
});
