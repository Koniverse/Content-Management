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
     method: 'POST',
     path: `/trigger/:pluralId`,
     handler: 'listing.triggerAutoFetch'
    },
    {
     method: 'POST',
     path: `/github-action/enabled`,
     handler: 'github-action.getEnabled',
     config: {
       auth: false
     },
    },
    {
     method: 'POST',
     path: `/github-action/executed`,
     handler: 'github-action.executed',
     config: {
       auth: false
     },
    },
  ],
};
