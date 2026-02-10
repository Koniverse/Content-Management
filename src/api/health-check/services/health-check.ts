/**
 * health-check service
 */

import { factories } from '@strapi/strapi';
import Bluebird from 'bluebird';
import { fetchWithTimeout } from "../../../utils/fetchWithTimeout";
import { sendMessageDiscord } from "../../../utils/sendMessageDissord";
import { formatDiscordInfo } from "../../../utils/formatDiscordInfor";

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

export default factories.createCoreService('api::health-check.health-check', ({ strapi }) => ({
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
    const data = !Array.isArray(_data) ? [_data] : _data;
    console.log('Running healthCheck for', data.length, 'URLs', data);

    await Bluebird.map(data, async (urlInfo) => {
      try {
        const {
          id,
          url,
          status_code: statusCode,
          time_out: timeOut,
          live_status: liveStatus,
          check_failed_count: checkFailedCount,
          notification_threshold: notificationThreshold,
          name,
          request_data: requestData,
          discord_infos: discordInfos,
        } = urlInfo

        // @ts-ignore
        const _requestData = requestData && Object.keys(requestData).length !== 0 ? {
          ...requestData,
        } : {};

        if (_requestData.body) {
          _requestData.body = JSON.stringify(_requestData.body);
        }

        if (_requestData.method && ['GET', 'HEAD'].includes(_requestData.method.toUpperCase())) {
          delete _requestData.body;
        }
        const response = await fetchWithTimeout(url, _requestData, timeOut);
        const isSuccess = (response.status as number) === statusCode;

        let nextLiveStatus = liveStatus;
        let nextCheckFailedCount = checkFailedCount || 0;
        let shouldNotify = false;
        const threshold = notificationThreshold || 3;

        if (isSuccess) {
          if (liveStatus !== 'Live') {
            nextLiveStatus = 'Live';
            shouldNotify = true;
          }
          nextCheckFailedCount = 0;
        } else {
          if (liveStatus === 'Live') {
            nextCheckFailedCount += 1;

            if (nextCheckFailedCount >= threshold) {
              nextLiveStatus = 'Error';
              shouldNotify = true;
              nextCheckFailedCount = 0;
            }
          } else {
            nextCheckFailedCount = 0;
          }
        }
        if (shouldNotify) {
          await strapi.entityService.update('api::health-check.health-check', id, {
            data: {
              live_status: nextLiveStatus,
              check_failed_count: nextCheckFailedCount
            }
          })

          await sendMessageDiscord(HEALTH_CHECK_DISCORD, formatMessageDiscord(name, nextLiveStatus, url, response.status, discordInfos))
        } else {
          const countersChanged = nextCheckFailedCount !== (checkFailedCount || 0);
          if (countersChanged) {
            await strapi.entityService.update('api::health-check.health-check', id, {
              data: {
                check_failed_count: nextCheckFailedCount
              }
            })
          }
        }
        0
      } catch (err) {
        console.log('Error in healthCheck', err);
      }
    }, { concurrency: 3 });


  }


}))
