const message = require('./../../utils/message');

// INSERT INTO `my-strata-v3`.`bilds` (`id`, `user_id`, `level`, `params`) VALUES (NULL, '10', '0', '{}');

module.exports.getAll = ({user_id, res}) => {

    let connection;
    require('../../db/db').connector()
        .then(
            (conn) => {
                connection = conn;
                return connection.query(`SELECT level, title, params FROM bilds a WHERE a.user_id = '${user_id}'`);
            }
        )
        .then(
            (rows) => {
                message.message({res, body: rows, statusCode: 200});
                connection.end();
            }
        )
        .catch(
            ({status='error', statusCode=500}) => {
                message.message({res, text:'', status, statusCode});
                if (connection && connection.end) connection.end();
            }
        )

}
