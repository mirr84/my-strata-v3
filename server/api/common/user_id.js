module.exports = ({token}) => {

    const promise = new Promise(
        (resolve, reject) => {

            if (!token) {
                reject('Токен не задан');
            }

            let connection;
            require('../../db/db').connector()
                .then(
                    (conn) => {
                        connection = conn;
                        return connection.query(`SELECT a.user_id FROM tokens a WHERE token = '${token}' AND a.active='1'`);
                    }
                )
                .then(
                    (rows) => {
                        if (rows.length === 0) {
                            reject('Пользователь не определен');
                        } else {
                            resolve(rows[0].user_id);
                        }
                        connection.end();
                    }
                )
                .catch(
                    (error) => {
                        reject('Неопределенная ошибка');
                        if (connection && connection.end) connection.end();
                    }
                );

        }
    );

    return promise;

}
