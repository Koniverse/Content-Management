import { errors } from "@strapi/utils";


export default {
  afterCreate: async (event: Event) => {
    await strapi.services['api::audit-log.audit-log'].addAuditLogs( 'create', event);
  },
  beforeDelete: async (event: Event) => {
    await strapi.services['api::audit-log.audit-log'].addAuditLogs( 'delete', event);
  },
  beforeDeleteMany: async (event: Event) => {
    await strapi.services['api::audit-log.audit-log'].addAuditLogs( 'deleteMany', event);
  },
  beforeUpdate: async (event: Event) => {
    await strapi.services['api::audit-log.audit-log'].addAuditLogs( 'update', event);
  }
};
