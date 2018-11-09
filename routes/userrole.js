/**
 * CMS用户相关控制路由
 */
var express = require('express');
var mysqlClient = require('../dbutil/mysqlclient');
var router = express.Router();

function GetUserPermissions(req) {
    let b = true;
    if (req.session.user == null) {
        b = false;
    } else {
        if (req.session.user.permissions != "login") {
            b = false;
        }
    }
    return b;
}

/**
 * 渲染用户角色管理页面
 */
router.get("/", function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    res.render("userrole");
});

/**
 * 列出所有用户名路由
 */
router.post("/userroleall", function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let _page = parseInt(req.body.page);
    let _pageSize = parseInt(req.body.limit);
    let _start = parseInt(req.body.start);
    let _endrow = _start + _pageSize;

    let sql = "select (select count(id) as total from t_user_role) total,id,rolename,description,parentid from t_user_role limit ?,?";
    let pms = [_start, _pageSize];
    mysqlClient.query(sql, pms, function (err, recs) {
        let strJson = "{\"rows\":[";
        let sum = 0;
        if (err) {
            console.log(err);
        } else {
            let _len = recs.length;
            if (_len > 0) {
                let _row;
                for (let i = 0; i < _len; i++) {
                    _row = recs[i];
                    if (i == 0)
                        sum = _row.total;
                    let strTemp = "{\"id\":\"" + _row.id +
                        "\",\"rolename\":\"" + _row.rolename +
                        "\",\"parentid\":\"" + _row.parentid +
                        "\",\"description\":\"" + _row.description + "\"}";
                    if (i < (_len - 1))
                        strTemp += ",";
                    strJson += strTemp;
                }
            }
        }
        strJson += "],\"total\":" + sum + "}";
        res.send(strJson);
    });
});

/**
 * 添加用户角色路由
 */
router.post("/adduserrole", function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let _rolename = req.body.rolename;
    let _description = req.body.description;
    let _parentid = req.body.parentid;
    let sql = "insert into t_user_role(id,rolename,description,parentid) values (replace(uuid(),'-',''),?,?,?)";
    let params = [_rolename, _description, _parentid];
    mysqlClient.query(sql, params, function (err, recs) {
        if (err) {
            console.log(err);
            res.send("{'state':-1}");
            return;
        }
        res.send("{'state':0}");
    });
});

/**
 * 修改用户角色路由
 */
router.post("/edituserrole", function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }

    let _id = req.body.id;
    let _rolename = req.body.rolename;
    let _description = req.body.description;
    let _parentid = req.body.parentid;
    let sql = "update t_user_role set rolename=?,description=?,parentid=? where id=?";
    let params = [_rolename, _description, _parentid, _id];
    mysqlClient.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            res.send("{'state':-1}");
            return;
        }
        res.send("{'state':0}");
    });
});

/**
 * 删除用户角色路由
 */
router.post("/deleteuserrole", function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let rows = req.body;
    let sql = 'delete from t_user_role';
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
            } else
                res.send("{'state':0}");
        });
    } else {
        sql = sql + " where id=?";
        let params = [req.body.id];
        mysqlClient.query(sql, params, function (err, result) {
            if (err) {
                console.log(err);
                res.send("{'state':-1}");
            } else
                res.send("{'state':0}");
        });
    }
});

/**
 * 查询指定用户角色具有的功能
 */
router.post("/getmyfunc", function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let _roleid = req.body.roleid;
    if (_roleid == null || '' == _roleid || 'undefined' == _roleid) {
        res.send("{\"rows\":[]}");
        return;
    }
    let sql = "select a.* from t_user_function a left join t_role_function_map b on b.funcid=a.id where b.roleid=? order by a.orderby asc";
    let params = [_roleid];
    mysqlClient.query(sql, params, function (err, recs) {
        let strJson = { state: 0, rows: [] };
        if (err) {
            console.log(err);
            return;
        } else {
            strJson.rows = recs;
            res.send(JSON.stringify(strJson));
        }
    });
});

router.post("/saverolefunc", function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let userid = req.session.user.id;
    let rows = req.body;
    let _roleid, _funcid;
    let sqlDelete = "";
    let sql = "";
    let sqlTmpValues = "";
    let params = [];
    if (rows instanceof Array) {
        _roleid = rows[0].roleid;
        if (_roleid == 'undefined') {
            return;
        }
        sqlDelete = "delete from t_role_function_map where roleid=?";
        params.push(_roleid);
        mysqlClient.query(sqlDelete, params, function (err, result) {
            if (err) {
                console.log(err);
                res.send("{'state':-1}");
                return;
            }
            params.length = 0;
            sql = "insert into t_role_function_map values";
            rows.forEach(function (_row, index, array) {
                _funcid = _row.funcid;
                sqlTmpValues = "(replace(uuid(),'-',''),?,?)";
                if (index < array.length - 1)
                    sqlTmpValues += ",";
                sql += sqlTmpValues;
                params.push(_roleid);
                params.push(_funcid);
            });
            mysqlClient.query(sql, params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.send("{'state':-1}");
                    return;
                }
                res.send("{'state':0}");
            });
        });
    } else {
        _roleid = req.body.roleid;
        _funcid = req.body.funcid;
        if (_roleid == 'undefined' || _funcid == 'undefined') {
            return;
        }
        sqlDelete = "delete from t_role_function_map where roleid=?";
        params.push(_roleid);
        mysqlClient.query(sqlDelete, params, function (err, result) {
            if (err) {
                console.log(err);
                res.send("{'state':-1}");
                return;
            }
            sql = "insert into t_role_function_map values(replace(uuid(),'-',''),?,?)";
            params.length = 0;
            params.push(_roleid);
            params.push(_funcid);
            mysqlClient.insert(sql, params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.send("{'state':-1}");
                    return;
                }
                res.send("{'state':0}");
            });
        });
    }
});


module.exports = router;
