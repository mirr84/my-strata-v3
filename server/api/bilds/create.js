const message = require('./../../utils/message');

module.exports.create = ({user_id, res}) => {

    let connection;
    require('../../db/db').connector()
        .then(
            (conn) => {
                connection = conn;
                return connection.query(`INSERT INTO bilds (user_id, params) VALUES ('${user_id}', '{}')`);
            }
        )
        .then(
            (rows) => {
                message.message({res, statusCode: 200});
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
