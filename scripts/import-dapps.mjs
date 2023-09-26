import insertData from './inputs/dapps/insert.json' assert { type: "json" };
import {insertItems} from "./strapi-api.mjs";

insertItems('dapps', insertData).then(() => {
  console.log('Done');
});

