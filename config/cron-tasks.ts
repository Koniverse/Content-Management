import {Strapi} from "@strapi/types";

export default {
  autoGetCrowdloanFunds: {
    task: async ({strapi: Strapi}) => {
      try {
        await strapi.service('api::crowdloan-fund.crowdloan-fund').autoGetFunds();
      } catch (err) {
        console.log('Error in autoGetCrowdloanFunds cron task', err);
      }
    },
    options: {
      rule: '0 0 * * *'
    }
  },
  healthCheck: {
    task: async ({strapi: Strapi}) => {
      try {
        await strapi.service('api::health-check.health-check').healthCheck();
      } catch (err) {
        console.log('Error in healthCheck cron task', err);
      }
    },
    options: {
      rule: '* * * * *'
    }
  },
  validateData: {
    task: async ({strapi: Strapi}) => {
      try {
        await strapi.service('api::data-validate.data-validate').validate();
      } catch (err) {
        console.log('Error in validateData cron task', err);
      }
    },
    options: {
      rule: '*/15 * * * *'
    }
  }
}
