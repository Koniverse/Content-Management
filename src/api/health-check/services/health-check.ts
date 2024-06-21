/**
 * health-check service
 */

import {factories} from '@strapi/strapi';
import Bluebird from 'bluebird';
import {fetchWithTimeout} from "../../../utils/fetchWithTimeout";
import {sendMessageDiscord} from "../../../utils/sendMessageDissord";

const HEALTH_CHECK_DISCORD = 'https://discord.com/api/webhooks/1250732254712303616/pboc9_-CWI91kFhy7RUwGjRP4se8EjHBK8FFmrk_mrtdkZvH4tGoYJYNBx0z9gVnJjro'

const formatMessageDiscord = (name: string,liveStatus: string, url: string, statusCode: string | number) => {
  switch (liveStatus) {
    case 'Live':
      return `API ${name}: ${url} is up`
    case 'Error':
    default:
      return `API ${name}: ${url} is down with status code ${statusCode}`
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
        const {id, url, status_code: statusCode, time_out: timeOut, live_status: liveStatus, name} = urlInfo
        const response = await fetchWithTimeout(url, {}, timeOut);
        const newLiveStatus = response.status as number === statusCode ? 'Live' : 'Error'

        if (newLiveStatus.toLowerCase() !== liveStatus.toLowerCase()) {
          await strapi.entityService.update('api::health-check.health-check', id, {
            data: {
              live_status: newLiveStatus
            }
          })

          await sendMessageDiscord(HEALTH_CHECK_DISCORD, formatMessageDiscord(name, newLiveStatus, url, response.status))
        }

      } catch (err) {
        console.log('Error in healthCheck', err);
      }
    }, {concurrency: 3});


  }


}))
