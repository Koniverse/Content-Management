import { errors } from "@strapi/utils";


export default {
  afterCreate: async (event: Event) => {
    await strapi.services['api::audit-log.audit-log'].addAuditLogs( 'create', event);
  },
  beforeUpdate: async (event: Event) => {
    await strapi.services['api::audit-log.audit-log'].addAuditLogs( 'update', event);
  }
};
