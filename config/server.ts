import cronTasks from "./cron-tasks";
// import crontask_create from "./cron-task-i18n"
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  cron: {
    enabled: false,
    tasks: {
      // ...cronTasks,
      // ...crontask_create,
    }
  }
});
