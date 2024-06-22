/**
 * health-check service
 */

import {factories} from '@strapi/strapi';
import Bluebird from 'bluebird';
import {fetchWithTimeout} from "../../../utils/fetchWithTimeout";
import {sendMessageDiscord} from "../../../utils/sendMessageDissord";

//https://discord.com/channels/447263980252037141/1253671064844763248
const HEALTH_CHECK_DISCORD = 'https://discord.com/api/webhooks/1253671208600338462/Jp9Liil5Bq1xH7lroTCdYI42LzHGb6raoIsSjLCMp07KMvb0-ThpMCoAuAnsDrnzZ99J'

const formatMessageDiscord = (name: string, liveStatus: string, url: string, statusCode: string | number, ownerDiscordIds: string, roleDiscordIds: string) => {
  let userInfo = ''
  const userIds = ownerDiscordIds ? ownerDiscordIds.split(',').map(id => id.trim()).filter(id => id !== '') : [];
  userIds.map(id => {
    userInfo = userInfo + `<@${id}> `
  })
  let roleInfo = ''
  const roleIds = roleDiscordIds ? roleDiscordIds.split(',').map(id => id.trim()).filter(id => id !== '') : [];
  roleIds.map(id => {
    roleInfo = roleInfo + `<@&${id}> `
  })

  switch (liveStatus) {
    case 'Live':
      return `API ${name}: ${url} is up.\ncc: ${userInfo} ${roleInfo}`
    case 'Error':
    default:
      return `API ${name}: ${url} is down with status code ${statusCode}\ncc: ${userInfo} ${roleInfo}`
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
      sort: 'id:asc',
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
          owner_discord_ids: ownerDiscordIds,
          role_discord_ids: roleDiscordIds,
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

          await sendMessageDiscord(HEALTH_CHECK_DISCORD, formatMessageDiscord(name, newLiveStatus, url, response.status, ownerDiscordIds, roleDiscordIds))
        }

      } catch (err) {
        console.log('Error in healthCheck', err);
      }
    }, {concurrency: 3});


  }


}))
