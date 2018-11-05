/**
 *接口存取数据库操作封装
 */
var mysqlClient = require('./mysqlclient');
var qs = require('querystring');
var http = require('http');

var webRoot = 'http://192.168.84.49:9999';
//var webRoot = 'https://182.148.112.230:9999';

var DBHelper = {};



/**
 * 根据用户登录名和密码验证用户
 * @param {} usr_name：登录名
 * @param {} usr_pwd：密码
 * @param {} resp：响应上下文
 */
DBHelper.getUserId = function (usr_name, usr_pwd, resp) {
    var sql_panduan = " select (select id from t_user where loginname=? and password=?) as id ,(select name from t_user where loginname=? and password=?) as name  b.rolename,b.id as roleid,r.funcid,f.funccode from t_user_role as b INNER JOIN t_role_function_map as r INNER JOIN t_user_function as f where b.id=r.roleid and f.id=r.funcid and b.id=(SELECT a.roleid FROM t_user_role_relation AS a INNER JOIN t_user AS u  WHERE a.userid = u.id AND u.loginname = ? AND u.`password` = ?)"
    var sql_user = "SELECT t_user.*,t_user_role.rolename,t_user_function.funccode" +
        " FROM t_user" +
        " INNER JOIN t_user_role_relation ON t_user.id = t_user_role_relation.userid" +
        " INNER JOIN t_user_role ON t_user_role_relation.roleid = t_user_role.id" +
        " INNER JOIN t_role_function_map ON t_user_role.id = t_role_function_map.roleid" +
        " INNER JOIN t_user_function ON t_role_function_map.funcid = t_user_function.id" +
        " where t_user.loginname=? and t_user.password=?";
    var pms_user = [usr_name, usr_pwd];
    mysqlClient.query(sql_user, pms_user, function (err, recs) {
        if (err) {
            console.log(err);
            resp.send("{\"state\":-1,\"msg\":\"" + err + "\"}");
            return;
        }
        var _len = recs.length;
        if (_len > 0) {
            var _row = recs[0];
            var usrid = _row.id;
            var name = _row.name;
            var rolename = _row.rolename;
            var funccodearray = [];
            for (var i = 0; i < _len; i++) {
                funccodearray.push(recs[i].funccode);
            }
            // if (rolename == "管理员" || rolename == "内容管理员") {
            //     resp.send("{\"state\":-1,\"msg\":\"管理员与内容管理员不能登录系统!\"}");
            //     return;
            // }
            if (usrid == '') {
                resp.send("{\"state\":-1,\"msg\":\"用户不存在!\"}");
            } else {
                var userid = _row.id;
                var sql_update = "update t_user set sigin=true where id=?";
                var pms_update = [userid];
                mysqlClient.query(sql_update, pms_update, function (e_update, r_update) {
                    if (e_update) {
                        console.log(e_update);
                        resp.send("{\"state\":-1,\"msg\":\"" + e_update + "\"}");
                        return;
                    }
                    var sql_configBySys = "select * from t_configBySys";
                    var pms_configBySys = [];
                    mysqlClient.query(sql_configBySys, pms_configBySys, function (e_configBySys, r_configBySys) {
                        if (e_configBySys) {
                            console.log(e_configBySys);
                            resp.send("{\"state\":-1,\"msg\":\"" + e_configBySys + "\"}");
                            return;
                        }
                        var txtResp = "{\"state\":0,\"userid\":\"" + usrid +
                            "\",\"name\":\"" + name +
                            "\",\"funccodearray\":\"" + funccodearray.toString() + '"}';
                        // for (var o = 0; o < r_configBySys.length; o++) {
                        //     var model = r_configBySys[o];
                        //     txtResp += '","' + model.type + '":"' + model.remark + '"';
                        // }
                        // txtResp += '}';
                        resp.send(txtResp);
                    });
                });
            }
        } else {
            resp.send("{\"state\":-1,\"msg\":\"用户名或密码错误!\"}");
        }
    });
};

/**
 * 退出登录
 * @param {} userid：登录名
 */
DBHelper.exit = function (userid, resp) {
    var sql = "select id from t_user where id=?";
    var params = [userid];
    mysqlClient.query(sql, params, function (err, recs) {
        if (err) {
            console.log(err);
            resp.send("{\"state\":-1}");
            return;
        }
        if (recs.length > 0) {
            var sql_up = "update t_user set sigin=false where id=?";
            var pms_up = [userid];
            mysqlClient.update(sql_up, pms_up, function (e, r) {
                if (e) {
                    console.log(err);
                    resp.send("{\"state\":-1}");
                    return;
                }
                resp.send("{\"state\":0}");
            });
        }
    });
};

/**
 * 修改指定用户id的密码
 * @param {} userid--用户id
 * @param {} oldpwd--旧密码
 * @param {} newpwd--新密码
 * @param {} resp--响应上下文
 */
DBHelper.changePassword = function (userid, oldpwd, newpwd, resp) {
    var sql = "select id from t_user where id=? and password=?";
    var params = [userid, oldpwd];
    mysqlClient.query(sql, params, function (err, recs) {
        if (err) {
            console.log(err);
            resp.send("{\"state\":-1}");
            return;
        }
        var _len = recs.length;
        if (_len > 0) {
            sql = "update t_user set password=? where id=?";
            var pms = [newpwd, userid];
            mysqlClient.update(sql, pms, function (err, recs) {
                if (err) {
                    console.log(err);
                    resp.send("{\"state\":-1}");
                    return;
                }
                resp.send("{\"state\":0}");
            });
        } else {
            resp.send("{\"state\":-1}");
        }
    });
};









/**
 * 拿到用户账户列表
 * @param {} start：数据开始的序号
 * @param {} pagesize：每页数据的条数
 * @param {} userid：发起请求的用户的ID
 * @param {} resp：响应上下文
 */
DBHelper.getUserList = function (start, pagesize, userid, resp) {
    //先用userid去查询数据库中是否有这个用户
    var sql_user = "select * from t_user where id=?";
    var pms_user = [userid];
    mysqlClient.query(sql_user, pms_user, function (err, recs) {
        if (err) {
            console.log(err);
            resp.send("{\"state\":-1}");
            return;
        }
        var _len = recs.length;
        if (_len > 0) {  //证明存在这个用户，本次请求为正确途径请求
            var sql_list = " select (select count(id) as total from t_user) total,id,loginname,password,name,telphone,lastlogintime,lastipaddress,unit,charger,duty,sigin,sortorter,levelgroup from t_user order by sortorter desc limit ?,?";
            var pms_List = [start, pagesize];
            mysqlClient.query(sql_list, pms_List, function (e, r) {
                var strJson = '{\"state\":0,"rows":[';
                var sum = 0;
                if (e) {
                    console.log(e);
                    resp.send("{\"state\":-1}");
                    return;
                }
                var len = r.length;
                if (len > 0) {
                    var _row;
                    for (var i = 0; i < len; i++) {
                        _row = r[i];
                        if (i == 0)
                            sum = _row.total;
                        var strTemp = '{"id":"' + _row.id +
                            '","name":"' + _row.name +
                            '","telphone":"' + _row.telphone +
                            '","unit":"' + _row.unit.toString() +
                            '","duty":"' + _row.duty +
                            '","sortorder":"' + _row.sortorder +
                            '","levelgroup":"' + _row.levelgroup +
                            '"}';
                        if (i < (len - 1))
                            strTemp += ",";
                        strJson += strTemp;
                    }
                }
                strJson += "],'total':" + sum + "}";
                resp.send(strJson);
            });
        }
    });
};










/**
 * 根据用户Id得到用户信息
 * @param {} userid--用户id
 * @param {} resp--响应上下文
 */
DBHelper.getUserInfoByUserId = function (userid, resp) {
    var sql_user = "SELECT t_user.*,t_user_role.rolename,t_user_function.funccode" +
        " FROM t_user" +
        " INNER JOIN t_user_role_relation ON t_user.id = t_user_role_relation.userid" +
        " INNER JOIN t_user_role ON t_user_role_relation.roleid = t_user_role.id" +
        " INNER JOIN t_role_function_map ON t_user_role.id = t_role_function_map.roleid" +
        " INNER JOIN t_user_function ON t_role_function_map.funcid = t_user_function.id" +
        " where t_user.id =?";
    var pms_user = [userid];
    mysqlClient.query(sql_user, pms_user, function (e_user, r_user) {
        if (e_user) {
            console.log(e_user);
            resp.send("{\"state\":-1}");
            return;
        }
        if (r_user.length > 0) {
            var strJson = '{"state":0';
            var funccodearray = [];
            for (var i = 0; i < r_user.length; i++) {
                user = r_user[i];
                if (i == 0) {
                    strJson = strJson + ',"userid":"' + user.id + '","name":"' + user.name + '"';
                }
                funccodearray.push(user.funccode);
            }
            strJson = strJson + ',"funccodearray":"' + funccodearray.toString() + '"}';
            resp.send(strJson);
        } else {
            resp.send("{\"state\":-1}");
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

module.exports = DBHelper;