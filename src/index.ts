import {Event} from "@strapi/database/dist/lifecycles";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    strapi.db.lifecycles.subscribe({
      models: [
        'plugin::users-permissions.user',
      ],
      async afterCreate(event: Event) {
        await strapi.services['api::audit-log.audit-log'].handleAuditLog(event);
      },
      async afterCreateMany(event: Event) {
        await strapi.services['api::audit-log.audit-log'].handleAuditLog(event);
      },
      async beforeDelete(event: Event) {
        await strapi.services['api::audit-log.audit-log'].handleAuditLog(event);
      },
      async beforeDeleteMany(event: Event) {
        await strapi.services['api::audit-log.audit-log'].handleAuditLog(event);
      },
      async afterUpdate(event: Event) {
        await strapi.services['api::audit-log.audit-log'].handleAuditLog(event);
      },
      async afterUpdateMany(event: Event) {
        await strapi.services['api::audit-log.audit-log'].handleAuditLog(event);
      }
    });
  },
};
