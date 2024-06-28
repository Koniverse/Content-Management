/**
 * data-validate service
 */

import {factories} from '@strapi/strapi';
import fetch from 'node-fetch';
import Bluebird from 'bluebird';
import {findDuplicateKeyValue} from "../../../utils/findDuplicateKeyValue";
import {hashObject} from "../../../utils/hashObject";
import {formatDiscordInfo} from "../../../utils/formatDiscordInfor";

// @ts-ignore
const validateDataConfig = strapi.admin.config.validateDataConfigs;
const RESOURCE_URL = validateDataConfig.resourceUrl;
const urlImage = (folder: string, field: string, name: string) => `${RESOURCE_URL}/${folder}/images/${field}/${name}`;

const formatMessageDiscord = (collection: string, status: string, discordInfos: string) => {
  switch (status) {
    case 'normal':
      return `Data in collection ${collection} has returned to normal.${discordInfos}`
    case 'abnormal':
    default:
      return `Data in collection ${collection} is different from Static-data. Please check again.${discordInfos}`
  }
}

export default factories.createCoreService('api::data-validate.data-validate', ({strapi}) => ({
  async customList(params = {}) {
    return await strapi.entityService.findMany('api::data-validate.data-validate', {
      sort: 'id:asc',
      populate: ['discord_infos'],
      ...params
    });
  },

  async validate() {
    const _data = await strapi.entityService.findMany('api::data-validate.data-validate', {
      sort: 'id:asc',
      publicationState: 'live',
      populate: ['discord_infos']
    })
    const data = !Array.isArray(_data) ? [_data] : _data

    await Bluebird.map(data, async (collectionInfo) => {
      try {
        const {
          id,
          collection,
          unique,
          folder_static: folder,
          discord_infos: discordInfos,
          image_fields: imageFields,
          remove_fields: removeFields,
          status
        } = collectionInfo
        // @ts-ignore
        const validateDataConfig = strapi.admin.config.validateDataConfigs;
        let objects = await strapi.service(`api::${collection}.${collection}`).customList({publicationState: 'live'})
        const staticData = await fetch(`${validateDataConfig.staticDataUrl}/${folder}/list.json`)
        if (staticData.status !== 200) {
          throw new Error(`Error fetching static data for ${collection}`)
        }
        const _discordInfos = formatDiscordInfo(discordInfos)
        if (unique) {
          const duplicate = findDuplicateKeyValue(objects, 'slug');
          if (duplicate != null) {
            console.log("sendMessageDiscord newStatus duplicated", collection)
            // await sendMessageDiscord(HEALTH_CHECK_DISCORD, `Data in collection ${collection} shows signs of being duplicated at ${unique} ${JSON.stringify(duplicate)}. Please check again.${_discordInfos}`)
          }
        }
        objects = await Promise.all(objects.map(async item => {
          const dataImages = {};
          if (imageFields) {
            for (const field of imageFields) {
              const dataField = item[field];
              if (dataField) {
                const newFileName = dataField.split('/').pop();
                dataImages[field] = urlImage(folder, field, newFileName);
              }
            }
          }

          if (removeFields) {
            for (const f of removeFields) {
              if (f in item) {
                delete item[f];
              }
            }
          }
          delete item["createdAt"];
          delete item["updatedAt"];
          delete item["publishedAt"];
          return {...item, ...dataImages};
        }))
        objects = objects.sort((a, b) => a.id - b.id)
        const _hashObject = hashObject(objects);
        let _staticData = await staticData.json();
        _staticData = _staticData.sort((a, b) => a.id - b.id);
        const _hashStaticData = hashObject(_staticData)
        const newStatus = _hashObject !== _hashStaticData ? 'abnormal' : 'normal'

        if (newStatus.toLowerCase() !== status.toLowerCase()) {
          await strapi.entityService.update('api::data-validate.data-validate', id, {
            data: {
              status: newStatus
            }
          })
          console.log("sendMessageDiscord newStatus", newStatus, collection)
          // await sendMessageDiscord(HEALTH_CHECK_DISCORD, formatMessageDiscord(collection, newStatus, _discordInfos))
        }

      } catch (err) {
        console.log('Error in healthCheck', err);
      }
    }, {concurrency: 3});


  }


}))
