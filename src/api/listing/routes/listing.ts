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
  ],
};
