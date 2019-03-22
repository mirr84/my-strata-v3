const mysql = require('promise-mysql');

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'my-strata-v3'
}

const connector = () =>
    mysql
        .createConnection(config)
        .catch(
            ({error, res, connection}) => {
                if (connection && connection.end) connection.end();

                throw {
                    text: 'ошибка создания коннекта к базе',
                    status: 'fatalError',
                    statusCode: 500
                }

            }
        );

module.exports = ({connector});