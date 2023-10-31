module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/i18ns/:id/en',
            handler: 'i18n.langEn',
            config: {
                auth: false,
            },
        },
        {
            method: 'GET',
            path: '/i18ns/:id/ru',
            handler: 'i18n.langRu',
            config: {
                auth: false,
            },
        },
        {
            method: 'GET',
            path: '/i18ns/:id/zh',
            handler: 'i18n.langZh',
            config: {
                auth: false,
            },
        },
    ],
};