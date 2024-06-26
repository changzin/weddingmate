const database = {
    database: "wedding_mate",
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "1234"
};

const dbPool = require('mysql').createPool(database);

module.exports = async (query, param = [], where = '') => {
    return new Promise((resolve, reject) => dbPool.query(query + where, param, (error, rows) => {
        if (error) {
        if (error.code != 'ER_DUP_ENTRY')
            console.log(error);
            // DB에서 에러 시 무조건 500을 반환하도록 설정하였음.
            const result = {
                status: 500,
                message: "데이터베이스 에러입니다"
            }
            
            resolve(
                result
            );
        } else resolve(rows);
    }));
}
