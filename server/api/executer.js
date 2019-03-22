const message = require('./../utils/message');

module.exports = ({config, app}) => {

    config.map(
        item => {

            switch (item.type) {
                case 'public':
                    return app[item.method](item.url, (req, res) =>
                        require(`.${item.url}`)[item.url.split('/').pop()](
                            {
                                ...req.query,
                                ...req.body,
                                res
                            }
                        )
                    )

                case 'private':
                    return app[item.method](
                        item.url, (req, res) => {
                            require('./common/user_id')({...req.headers})
                                .then(
                                    (user_id) => {

                                        // пользователя получили и идем дальше
                                        require(`.${item.url}`)[item.url.split('/').pop()](
                                            {
                                                user_id: user_id,
                                                ...req.query,
                                                ...req.body,
                                                res
                                            }
                                        )

                                    },
                                    (text) => {
                                        message.message({res, text, status: 'error', statusCode: 401})
                                    }
                                )
                        }
                    )

                default:
                    break;
            }

        }
    )

}
