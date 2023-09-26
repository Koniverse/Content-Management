import axios from "axios";
import {GraphQLClient} from "graphql-request";

// Init basic config
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;
const AUTHORIZATION_HEADER = {
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

export const graphQLClient = new GraphQLClient(`${STRAPI_URL}/graphql`, {
    headers: {
        "Authorization": "Bearer " + STRAPI_TOKEN,
    },
});

export async function getItems(pluralApiId, params = {"pagination[pageSize]": 1000}) {
  const urlEncode = Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
  const url = `${STRAPI_URL}/api/${pluralApiId}?${urlEncode}`;
  console.log('GET', url);
  return await axios.get(url, {
    headers: AUTHORIZATION_HEADER,
  }).then(rs => {
    return rs.data.data;
  });
}

export async function updateItem(pluralApiId, id, data) {
  return await axios.put(`${STRAPI_URL}/api/${pluralApiId}/${id}`, {
    data
  }, {
    headers: AUTHORIZATION_HEADER,
  }).then(rs => {
    console.log('Update with response content:', rs.data);
    return rs.data;
  }).catch(e => {
    console.log('Error:',  JSON.stringify(e.response.data));
  })
}

export async function updateItems(pluralApiId, data) {
  for (let i = 0; i < data.length; i++) {
    await updateItem(pluralApiId, i + 1, data[i]);
  }
}

export async function insertItem(pluralApiId, data) {
  return await axios.post(`${STRAPI_URL}/api/${pluralApiId}`, {
    data
  }, {
    headers: AUTHORIZATION_HEADER,
  }).then(rs => {
    console.log('Insert with response content:', rs.data);
    return rs.data;
  }).catch(e => {
    console.log('Error:',  e?.response?.data ? JSON.stringify(e.response.data) : e);
  })
}

export async function insertItems(pluralApiId, data) {
  for (let item of data) {
    await insertItem(item);
  }
}

