const express = require('express');
const app = express();
const cors = require('cors');
// app.use(express.json({ limit: '50mb' }));
app.use(cors())

require('dotenv').config()
const mysqlClient = require('./functions/mysqlconn');
const redisClient = require('./functions/redisconn');
console.log(`Trata de conectar a MySQL: ${process.env.MYSQL_HOST}`);
console.log(`Trata de conectar a Redis: ${process.env.REDIS_HOST}`);


mysqlClient.connect((err) => {
    if (err) return console.error("ERR CONNECT MYSQL===" + err.stack);
    console.log("===MYSQL CONNECTED===");
});

redisClient.on("ready", () => {
    console.log("===REDIS CONNECTED===");
});

redisClient.on("error", (error) => {
    console.error("ERR CONNECT REDIS===" + error);
});


app.get('/mysql', (req, res) => {
    mysqlClient.query("SELECT * FROM Voto", (error, results) => {
        if (error) {
            return console.error("Error al ejecutar la consulta: " + error.stack);
        }
        const MysqlResult = results.map(row => ({
            sede: row.sede,
            municipio: row.municipio,
            departamento: row.departamento,
            papeleta: row.papeleta,
            partido: row.partido
        }));
        const result = {
            mysql: MysqlResult
        };
        res.send(JSON.stringify(result));
    });
});
app.get('/redis', (req, res) => {
    redisClient.eval("local cursor = 0\nlocal votes = {}\n\nrepeat\n  local res = redis.call('SCAN', cursor, 'MATCH', 'votos:*', 'COUNT', 1000)\n  cursor = tonumber(res[1])\n  local keys = res[2]\n  \n  for i = 1, #keys do\n    local key = keys[i]\n    local data = redis.call('HGETALL', key)\n    table.insert(votes, data)\n  end\nuntil cursor == 0\n\nreturn votes", 0, (err, result) => {
        if (err) {
            return console.error("Error al ejecutar el script de Lua en Redis: " + err);
        }
        const RedisResult = result.reduce((acc, val) => {
            const obj = {};
            for (let i = 0; i < val.length; i += 2) {
                if (val[i] === "sede") {
                    obj[val[i]] = parseInt(val[i + 1]);
                } else {
                    obj[val[i]] = val[i + 1];
                }
            }
            acc.push(obj);
            return acc;
        }, []);

        // console.log("REDIS:\n", RedisResult);
        // console.log("MYSQL:\n", MysqlResult);
        const results = {
            redis: RedisResult
        };

        res.send(JSON.stringify(results));
    });
});

app.listen(8080, () => {
    console.log('Servidor Express iniciado en el puerto 8080');
});
