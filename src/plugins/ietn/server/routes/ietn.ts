export default {
    type: "admin",
    routes: [
      {
        method: "GET",
        path: "/find",
        handler: "ietn.find",
        config: {
          policies: [],
        },
      },
      {
        method: "POST",
        path: "/post",
        handler: "ietn.post",
        config: {
          policies: [],
        },
      },
      {
        method: "PUT",
        path: "/update",
        handler: "ietn.update",
        config: {
          policies: [],
        },
      },
    ],
  };
  