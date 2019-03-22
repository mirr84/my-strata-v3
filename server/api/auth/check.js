const message = require('./../../utils/message');

module.exports.check = ({user_id, res}) => {

    let connection;
    require('../../db/db').connector()
        .then(
            (conn) => {
                connection = conn;
                return connection.query(`UPDATE  tokens SET active =  '0' WHERE user_id ='${user_id}'`);
            }
        )
        .then(
            (rows) => {
                return connection.query(`INSERT INTO tokens (user_id, token) VALUES ('${user_id}', '${require('../../utils/makeGenerators').makeToken()}')`);
            }
        )
        .then(
            (r) => {
                return connection.query(`SELECT token FROM tokens WHERE id = '${r.insertId}'`);
            }
        )
        .then(
            (rows) => {
                res
                    .set('token', rows[0].token)
                    .sendStatus(200);
                connection.end();
            }
        )
        .catch(
            ({text, status='error', statusCode=401}) => {
                message.message({res, text, status, statusCode});
                if (connection && connection.end) connection.end();
            }
        )

}

