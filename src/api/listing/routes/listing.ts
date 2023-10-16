export default {
  routes: [
    {
     method: 'GET',
     path: `/list/:pluralId`,
     handler: 'listing.listAll',
     config: {
       auth: false
     },
    },
    {
     method: 'GET',
     path: `/githubAction/getEnabled/:pluralId`,
     handler: 'github-action.getEnabled',
     config: {
       auth: false
     },
    },
    {
     method: 'GET',
     path: `/githubAction/executed/:pluralId`,
     handler: 'github-action.executed',
     config: {
       auth: false
     },
    },
  ],
};
