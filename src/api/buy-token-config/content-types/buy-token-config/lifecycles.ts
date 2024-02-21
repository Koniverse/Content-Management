import { errors } from "@strapi/utils";


export default {
  beforeCreate: async (event: Event) => {
    await strapi.services['api::audit-log.audit-log'].addAuditLogs( 'create', event)
  },
  beforeUpdate: async (event: Event) => {
    await strapi.services['api::audit-log.audit-log'].addAuditLogs( 'update', event)
  },
  afterUpdate: async (event: Event) => {
    // console.log('afterUpdate', event)
  }
};
