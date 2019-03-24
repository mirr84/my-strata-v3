const mysql = require('promise-mysql');

const config = {
    host: 'y913929d.beget.tech',
    user: 'y913929d_stra_v3',
    password: '8fHBGdDQ',
    database: 'y913929d_stra_v3'
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