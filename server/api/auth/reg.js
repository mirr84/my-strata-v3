const message = require('./../../utils/message');

module.exports.reg = ({login, email, password, res}) => {

    if (!login) {
        message.message({res, text: 'Поле login пустое', status: 'error', statusCode: 401});
        return;
    }

    if (!email) {
        message.message({res, text: 'Поле email пустое', status: 'error', statusCode: 401});
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
                return connection.query(`SELECT * FROM users a WHERE login = '${login}' `);
            }
        )
        .then(
            (rows) => {
                if (rows.length !== 0) throw { text: 'Ошибка login не уникален', status: 'error' };
            }
        ).then(
            (conn) => {
                return connection.query(`SELECT * FROM users a WHERE email = '${email}' `);
            }
        )
        .then(
            (rows) => {
                if (rows.length !== 0) throw { text: 'Ошибка email не уникален', status: 'error' };
            }
        )
        .then(
            (rows) => {
                return connection.query(`INSERT INTO users (login, password, email) VALUES ('${login}', '${password}', '${email}')`);
            }
        )
        .then(
            (rows) => {
                message.message({res, text: 'Регистрация успешна', status: 'info', statusCode: '200'});
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
