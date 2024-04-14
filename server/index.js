const mysql = require('mysql2');
const fs = require('fs');

var config =
{
    host: 'golf-server.mysql.database.azure.com',
    user: 'fygiuyaekf',
    password: 'GolfBook25!',
    database: 'golfbook-database',
    port: 3306,
    ssl: {ca: fs.readFileSync("../../DigiCertGlobalRootCA.crt.pem")}
};

const conn = new mysql.createConnection(config);

conn.connect(
    function (err) {
    if (err) {
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
       console.log("Connection established.");
    }
});