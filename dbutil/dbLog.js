/**
 *接口存取数据库操作封装
 */
var mysqlClient = require('./mysqlclient');
var qs = require('querystring');
var http = require('http');



var DBLog = {};


DBLog.writeLog = function (userid, operation, renData, res) {
    var sql = "insert into t_log(id,userid,createtime,operation) values(replace(uuid(),'-',''),?,?,?)";
    var createtime = new Date().toLocaleString();
    var pms = [userid, createtime, operation];
    mysqlClient.query(sql, pms, function (err, recs) {
        if (err) {
            console.log(err);
            res.send("{\"state\":-1}");
            return;
        }
        res.send(renData);
    });
}



/**
 *得到Guid
 * @return {string}
 */
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function GetGuid() {
    var str = S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    return str;
}

module.exports = DBLog;