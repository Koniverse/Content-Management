/**
 * health-check service
 */

import {factories} from '@strapi/strapi';
import Bluebird from 'bluebird';
import {fetchWithTimeout} from "../../../utils/fetchWithTimeout";
import {sendMessageDiscord} from "../../../utils/sendMessageDissord";
import {formatDiscordInfo} from "../../../utils/formatDiscordInfor";

// @ts-ignore
const discordWebhooks = strapi.admin.config.discordWebhooks;
const HEALTH_CHECK_DISCORD = discordWebhooks.healthCheckDiscord;

const formatMessageDiscord = (name: string, liveStatus: string, url: string, statusCode: string | number, discordInfos: any[]) => {

  const _discordInfos = formatDiscordInfo(discordInfos)
  switch (liveStatus) {
    case 'Live':
      return `API ${name}: ${url} is up.${_discordInfos}`
    case 'Error':
    default:
      return `API ${name}: ${url} is down with status code ${statusCode}${_discordInfos}`
  }
}

export default factories.createCoreService('api::health-check.health-check', ({strapi}) => ({
  async customList(params = {}) {
    return await strapi.entityService.findMany('api::health-check.health-check', {
      sort: 'id:asc',
      ...params
    });
  },

  async healthCheck() {
    const _data = await strapi.entityService.findMany('api::health-check.health-check', {
      publicationState: 'live',
      sort: 'id:asc',
      populate: ['discord_infos']
    })
    const data = !Array.isArray(_data) ? [_data] : _data

    await Bluebird.map(data, async (urlInfo) => {
      try {
        const {
          id,
          url,
          status_code: statusCode,
          time_out: timeOut,
          live_status: liveStatus,
          name,
          request_data: requestData,
          discord_infos: discordInfos,
        } = urlInfo
        // @ts-ignore
        const _requestData = requestData && Object.keys(requestData).length !== 0 ? {
          ...requestData,
          body: requestData.body ? JSON.stringify(requestData.body) : {}
        } : {}
        const response = await fetchWithTimeout(url, _requestData, timeOut);

        const newLiveStatus = response.status as number === statusCode ? 'Live' : 'Error'

        if (newLiveStatus.toLowerCase() !== liveStatus.toLowerCase()) {
          await strapi.entityService.update('api::health-check.health-check', id, {
            data: {
              live_status: newLiveStatus
            }
          })

          await sendMessageDiscord(HEALTH_CHECK_DISCORD, formatMessageDiscord(name, newLiveStatus, url, response.status, discordInfos))
        }

      } catch (err) {
        console.log('Error in healthCheck', err);
      }
    }, {concurrency: 3});


  }


}))
