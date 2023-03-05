
const { con } = require('./dbconnection.js');
const getdata = async (req, res) => {
    try {
        var sql = `SELECT percent_ram, percent_cpu, cpu_json, ram_json, cpu_process FROM cpu_ram`
        console.log(sql)
        con.query(sql, function (err, result) {
            if (err) { 
                console.log(err);
                res.jsonp({ Res: false }) 
            }
            else {
                 //! RETORNO DE JSON PARA EL FRONTEND
                console.log(result);
                if (result.length == 1) {
                    res.jsonp({
                        percent_ram: result[0].percent_ram,
                        percent_cpu: result[0].percent_cpu,
                        cpu_json: result[0].cpu_json,
                        ram_json: result[0].ram_json,
                        cpu_process: result[0].cpu_process,
                    })
                } else {
                    res.jsonp({ Res: false })
                }
            }
        });

    } catch (error) {
        console.log(error)
        res.jsonp({ Res: false })
    }
}
module.exports = { getdata };
