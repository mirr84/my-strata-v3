const message = require('./../../utils/message');

module.exports.getAll = ({user_id, res}) => {

    let connection;
    require('../../db/db').connector()
        .then(
            (conn) => {
                connection = conn;
                return connection.query(`SELECT r1,r2,r3,r4,r5 FROM resources a WHERE a.user_id = '${user_id}'`);
            }
        )
        .then(
            (rows) => {
                if (rows.length === 0) {
                    return connection.query(`INSERT INTO resources (user_id) VALUES ('${user_id}')`);
                } else {
                    return rows;
                }
            }
        )
        .then(
            (rows) => {
                if (Array.isArray(rows)) {
                    return rows;
                } else {
                    return connection.query(`SELECT r1,r2,r3,r4,r5 FROM resources a WHERE a.user_id = '${user_id}'`);
                }
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
