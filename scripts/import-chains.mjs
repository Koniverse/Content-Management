import insertMap from './inputs/chains/insert.json' assert { type: "json" };
import {getItems, insertItem, updateItem} from "./strapi-api.mjs";
import {fetchByFolder} from "./fetch-upload.mjs";

const logos = await fetchByFolder('chains');
const logoMap = {}
logos.forEach(logo => {
  logoMap[logo.name] = parseInt(logo.id);
});

const existedMap = {}
const existed = await getItems('chains');
existed.forEach(chain => {
  existedMap[chain.attributes.slug] = chain.id;
});

let ordinal = 0;
Object.entries(insertMap).forEach(([slug, item]) => {
  ordinal++;
  const finalRecord = {
    ...item,
    ordinal,
    providers: Object.entries(item.providers).map(([name, url]) => ({name, url})),
    icon: logoMap[item.icon] ? [logoMap[item.icon]] : null,
    slug
  };

  if (existedMap[slug]) {
    updateItem('chains', existedMap[slug], {icon: finalRecord.icon, ordinal: finalRecord.ordinal}).catch(console.error);
  } else {
    insertItem('chains', finalRecord).catch(console.error);
  }
});
