/**
 *接口存取数据库操作封装
 */
var mysqlClient = require('./mysqlclient');
var DBTool = require('./dbtool');
var qs = require('querystring');
var http = require('http');
var schedule = require('node-schedule');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path')
var beifenDir = path.join(__dirname, "../public/backup");
var beifenPath = beifenDir + "/beifen.bat";
var DBbackup = {};
var j = null;//定时器对象



//得到数据库备份情况列表
DBbackup.backupall = function (_start, _pageSize, res) {
    let sql = "select (select count(id) as total from t_backup) total,t_backup.*,t_user.name as username from t_backup left join t_user on t_backup.userid=t_user.id order by backupTime desc limit ?,?";
    let pms = [_start, _pageSize];
    mysqlClient.query(sql, pms, function (err, recs) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify({ state: -1 }));
            return;
        }
        let ren = { state: 0, rows: recs };
        if (recs.length > 0)
            ren.total = recs[0].total;
        else
            ren.total = 0;
        res.send(JSON.stringify(ren));
    });
}


//删除数据库备份
DBbackup.deleteBackup = function (userid, rows, res) {
    let sql = 'delete from t_backup';
    if (rows instanceof Array) {
        let str = "";
        rows.forEach(function (_row, index, array) {
            if (index != 0) str += ",";
            str += "'" + _row.id + "'";
        });
        sql = sql + " where id in (" + str + ")";
        let params = [];
        mysqlClient.query(sql, params, function (err, result) {
            if (err) {
                console.log(err);
                res.send("{'state':-1}");
            } else {
                let msg = '删除数据库备份成功';
                let ren = { state: 0, msg: msg };
                DBTool.writeLog(mysqlClient, userid, msg, ren, res);
            }
        });
    } else {
        sql = sql + " where id=?";
        let params = [req.body.id];
        mysqlClient.query(sql, params, function (err, result) {
            if (err) {
                console.log(err);
                res.send("{'state':-1}");
            } else {
                let msg = '删除数据库备份成功';
                let ren = { state: 0, msg: msg };
                DBTool.writeLog(mysqlClient, userid, msg, ren, res);
            }
        });
    }
}


//备份一次
DBbackup.backupDataOnlyOne = function (userid, res) {
    exec(beifenPath, function (error, stdout, stderr) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({ state: -1, msg: error }));
            return;
        } else {
            var fileName = stdout.substring(stdout.lastIndexOf('/') + 1, stdout.lastIndexOf('.sql') + 4);
            var filePath = beifenDir + "\\" + fileName;
            var backupTime = new Date().toLocaleString();
            var sql = "insert into t_backup(id,fileName,backupTime,userid) values(replace(uuid(),'-',''),?,?,?)";
            var pms = [filePath, backupTime, userid];
            mysqlClient.query(sql, pms, function (err, recs) {
                if (err) {
                    console.log(err);
                    res.send(JSON.stringify({ state: -1 }));
                    return;
                }
                let msg = "备份数据库成功，已备份成文件" + filePath;
                let ren = { state: 0, msg: msg };
                DBTool.writeLog(mysqlClient, userid, msg, ren, res);
            });
        }
    });
}


DBbackup.backupDataTiming = function (userid, interval, res) {
    var dayofweek = interval.dayofweek != 0 ? interval.dayofweek : "*";
    var month = interval.month != 0 ? interval.month : "*";
    var dayofmonth = interval.dayofmonth != 0 ? interval.dayofmonth : "*";
    var hour = interval.hour != 0 ? interval.hour : "*";
    var minute = interval.minute != 0 ? interval.minute : "*";
    var second = interval.second != 0 ? interval.second : "*";
    if (dayofweek == "*" && month == "*" && dayofmonth == "*" && hour == "*" && minute == "*" && second == "*") { //取消自动定时
        var sql = "update t_backup_config set type='0' where type='1'";
        if (j != null) {
            j.cancel();
            j = null;
        }
        mysqlClient.query(sql, [], function (err, recs) {
            if (err) {
                console.log(err);
                res.send(JSON.stringify({ state: -1 }));
                return;
            }
            let msg = "取消自动定时成功!";
            let ren = { state: 0, msg: msg };
            DBTool.writeLog(mysqlClient, userid, msg, ren, res);
        });
    } else { //设置自动定时
        var updateTime = new Date().toLocaleString();
        var sql = "insert into t_backup_config(id,second,minute,hour,dayofmonth,month,dayofweek,type,updateTime,userid) values(replace(uuid(),'-',''),?,?,?,?,?,?,?,?,?)";
        var pms = [second, minute, hour, dayofmonth, month, dayofweek, 1, updateTime, userid];
        mysqlClient.query(sql, pms, function (err, recs) {
            if (err) {
                console.log(err);
                res.send(JSON.stringify({ state: -1 }));
                return;
            }
            let msg = "设置自动备份成功!";
            let ren = { state: 0, msg: msg };
            DBTool.writeLog(mysqlClient, userid, msg, ren, res);
            if (j != null) {
                j.cancel();
                j = null;
            }
            var timing = second + " " + minute + " " + hour + " " + dayofmonth + " " + month + " " + dayofweek;
            j = schedule.scheduleJob(timing, function () { //设置定时执行
                exec(beifenPath, function (error, stdout, stderr) { //备份数据库文件
                    if (error) {
                        console.log(error);
                    }
                    else {
                        var fileName = stdout.substring(stdout.lastIndexOf('/') + 1, stdout.lastIndexOf('.sql') + 4);
                        var filePath = beifenDir + "\\" + fileName;
                        var backupTime = new Date().toLocaleString();
                        var sql = "insert into t_backup(id,fileName,backupTime,userid) values(replace(uuid(),'-',''),?,?,?)";
                        var pms = [filePath, backupTime, userid];
                        mysqlClient.query(sql, pms, function (err, recs) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                        });
                    }
                });
            });
        });
    }
}


//得到当前最近一次设置的自动更新参数
DBbackup.getBackupConfig = function (res) {
    var sql = "select * from t_backup_config where type='1' order by updateTime desc limit 0,1";
    mysqlClient.query(sql, [], function (err, recs) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify({ state: -1 }));
            return;
        }
        let ren = { state: 0, rows: [{ dayofweek: 0, month: 0, dayofmonth: 0, hour: 0, minute: 0, second: 0 }] };
        if (recs.length != 0) {
            ren.rows = recs;
        }
        res.send(JSON.stringify(ren));
    });
}

DBbackup.restoreDataBase = function (userid, id, res) {
    var sql = "select fileName from t_backup where id=?";
    var pms = [id];
    var num = 0;
    mysqlClient.query(sql, pms, function (err, recs) {
        if (err) {
            console.log(err);
            res.send(JSON.stringify({ state: -1, msg: err }));
            return;
        }
        var filename = recs[0].fileName ? recs[0].fileName : "";
        if (filename != "") {
            exec(beifenPath, function (error, stdout, stderr) { //备份数据库文件
                if (error) {
                    console.log(error);
                    res.send(JSON.stringify({ state: -1, msg: error }));
                    return;
                }
                else {
                    var fileName = stdout.substring(stdout.lastIndexOf('/') + 1, stdout.lastIndexOf('.sql') + 4);
                    var filePath = beifenDir + "\\" + fileName;
                    var backupTime = new Date().toLocaleString();
                    sql = "insert into t_backup(id,fileName,backupTime,userid) values(replace(uuid(),'-',''),?,?,?)";
                    pms = [filePath, backupTime, userid];
                    mysqlClient.query(sql, pms, function (err, recs) {
                        if (err) {
                            console.log(err);
                            res.send(JSON.stringify({ state: -1 }));
                            return;
                        }
                        var cle = "C: && cd C:/Program Files/MySQL/MySQL Server 5.7/bin && mysql -uroot -p123456 parkingguidance<" + filename + "";
                        exec(cle, function (error, stdout, stderr) { //备份数据库文件
                            if (error) {
                                console.log(error);
                                res.send(JSON.stringify({ state: -1, msg: error }));
                                return;
                            }
                            else {
                                let msg = "还原数据库成功！已将当前数据库备份为" + filePath;
                                let ren = { state: 0, msg: msg };
                                DBTool.writeLog(mysqlClient, userid, msg, ren, res);
                            }
                        });
                    });
                }
            });

        }
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

module.exports = DBbackup;