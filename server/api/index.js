const init = (app) => {

    const config = [

        {url: '/auth/check', method: 'get', type: 'private'},
        {url: '/auth/auth', method: 'post', type: 'public'},
        {url: '/auth/logout', method: 'get', type: 'private'},
        {url: '/auth/reg', method: 'post', type: 'public'},

        {url: '/resources/getAll', method: 'get', type: 'private'},
        {url: '/resources/get', method: 'get', type: 'private'},

        {url: '/bilds/getAll', method: 'get', type: 'private'},
        {url: '/bilds/create', method: 'get', type: 'private'},

    ]

    require('./executer')({config, app});

}

module.exports = ({init});