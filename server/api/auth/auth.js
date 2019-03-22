const message = require('./../../utils/message');

module.exports.auth = ({login, password, res}) => {

    if (!login) {
        message.message({res, text: 'Поле login пустое', status: 'error', statusCode: 401});
        return;
    }

    if (!password || password==='d41d8cd98f00b204e9800998ecf8427e') {
        message.message({res, text: 'Поле password пустое', status: 'error', statusCode: 401});
        return;
    }

    let connection;
    require('../../db/db').connector()
        .then(
            (conn) => {
                connection = conn;
                // return connection.query(`SELECT * FROM users a LEFT JOIN tokens b ON b.user_id=a.id WHERE a.login='${login}' AND a.password='${password}' AND b.active='1'`);
                return connection.query(`SELECT * FROM users a WHERE login = '${login}' AND password = '${password}'`);
            }
        )
        .then(
            (rows) => {
                if (rows.length === 0) throw { text: 'Ошибка login или password' };
                return rows;
            }
        )
        .then(
            (rows) => {
                return connection.query(`INSERT INTO tokens (user_id, token) VALUES ('${rows[0].id}', '${require('../../utils/makeGenerators').makeToken()}')`);
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
