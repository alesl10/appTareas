import mysql from 'mysql2'

export const conexion = mysql.createConnection({
    host:'viaduct.proxy.rlwy.net',
    user:'root',
    password:'AbMwvjRFajGEUTtVgSKmErgZKCreWgeQ',
    database:'railway',
    port:52480,
    connectTimeout: 10000
});