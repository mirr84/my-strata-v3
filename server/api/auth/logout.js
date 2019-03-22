const message = require('./../../utils/message');

module.exports.logout = ({user_id, res}) => {

    let connection;
    require('../../db/db').connector()
        .then(
            (conn) => {
                connection = conn;
                return connection.query(`UPDATE  tokens SET active =  '0' WHERE user_id ='${user_id}'`);
            }
        )
        .then(
            () => {
                message.message({res, statusCode: 200});
                connection.end();
            }
        )
        .catch(
            ({text, status='error', statusCode=401}) => {
                message.message({res, text, status, statusCode});
                if (connection && connection.end) connection.end();
            }
        );

}

