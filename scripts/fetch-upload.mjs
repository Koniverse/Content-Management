import {graphQLClient} from "./strapi-api.mjs";
import {gql} from "graphql-request";

const folderQuery = gql`
query ($folderName: String = "") {
  uploadFolders(filters: {name: {eq: $folderName}}) {
    data {
      id
      attributes {
        path
        files (pagination: {pageSize: 1000}) {
          data {
            id
            attributes {
              name
            }
          }
        }
      }
    }
  }
}`;

export async function fetchByFolder(folderName) {
  const results = await graphQLClient.request(folderQuery, {folderName});
  return results.uploadFolders.data[0].attributes.files.data.map(file => {
    return {
      id: file.id,
      name: file.attributes.name,
      url: file.attributes.url,
    }
  });
}
