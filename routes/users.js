/**
 * CMS用户相关控制路由
 */
var express = require('express');
var mysqlClient = require('../dbutil/mysqlclient');
var router = express.Router();

function GetUserPermissions(req) {
    var b = true;
    if (req.session.user == null) {
        b = false;
    } else {
        if (req.session.user.permissions != "login") {
            b = false;
        }
    }
    return b;
}


/* GET users listing. */
router.get('/', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    res.render('users');
});

/**
 * CMS后台用户登录验证
 */
router.get('/login', function (req, res, next) {
    var _usrname = req.query.usr;
    var _pwd = req.query.pwd;
    //mysqlClient.init();
    var sql = "select t_user.* from" +
        " t_user" +
        " where loginname=? and password=?";
    var args = [_usrname, _pwd];
    mysqlClient.query(sql, args, function (err, rec) {
        //res.clearCookie('uid');
        req.session.user = null;
        var strJson = "{'id':";
        if (err) {
            strJson += "'-1','name':'','sigin':'0','unit':'','duty':'','role':''}";
        } else {
            if (!rec) {
                strJson += "'-1','name':'','sigin':'0','unit':'','duty':'','role':''}";
            } else {
                if (rec.length > 0) {
                    var _rid = rec[0].id;
                    var _rname = rec[0].name;
                    var _runit = rec[0].deptmentName;
                    var _rduty = rec[0].duty;
                    var _unitid = rec[0].deptmentid;
                    var sql_role = "select roleid from t_user_role_relation where userid=?";
                    var params_role = [_rid];
                    mysqlClient.query(sql_role, params_role, function (err_role, recs_role) {
                        if (err_role) {
                            console.log(err_role);
                        } else {
                            if (recs_role.length > 0) {
                                var role = recs_role[0].roleid;
                                var sql_role_fun = "select * from t_role_function_map where roleid=?";
                                var params_role_fun = [role];
                                mysqlClient.query(sql_role_fun, params_role_fun, function (e, r) {
                                    if (e) {
                                        console.log(e);
                                    } else {
                                        var data = [];
                                        var _len = r.length;
                                        if (_len > 0) {
                                            var _row;
                                            for (var i = 0; i < _len; i++) {
                                                _row = r[i];
                                                data.push(_row.funcid);
                                            }
                                        }
                                        req.session.user = {
                                            'id': _rid,
                                            'name': _rname,
                                            'unit': _runit,
                                            'duty': _rduty,
                                            'dutyid': _unitid,
                                            'role_func': data,
                                            'role': data.toString(),
                                            'type': "myself",
                                            'permissions': 'login'
                                        };
                                        strJson += "'" + _rid + "','name':'" + _rname + "','sigin':'1','unit':'" + _runit + "','duty':'" + _rduty + "','role':'" + data.toString() + "'";
                                        //res.cookie('uid',_rid,{maxAge:'43200000'})
                                        strJson += "}";
                                        res.send(strJson);
                                    }
                                });
                            } else {
                                req.session.user = {
                                    'id': _rid,
                                    'name': _rname,
                                    'unit': _runit,
                                    'duty': _rduty,
                                    'role_func': [],
                                    'role': ''
                                };
                                strJson += "'" + _rid + "','name':'" + _rname + "','sigin':'1','unit':'" + _runit + "','duty':'" + _rduty + "'";
                                //res.cookie('uid',_rid,{maxAge:'43200000'})
                                strJson += "}";
                                res.send(strJson);
                            }
                        }
                    });
                } else {
                    strJson += "'-1','name':'','sigin':'0','unit':'','duty':''}";
                    res.send(strJson);
                    return;
                }
            }
        }
    });
});

/**
 * APP端用户登录验证
 */
router.get('/applogin', function (req, res, next) {
    var _usrname = req.query.usr;
    var _pwd = req.query.pwd;
    //mysqlClient.init();
    var sql = "select * from t_user where loginname=? and password=? and deptment!='manager'";
    var args = [_usrname, _pwd];
    mysqlClient.query(sql, args, function (err, rec) {
        var strJson = "{'id':";
        if (err) {
            strJson += "'-1','name':'','sigin':'0','unit':'','duty':''";
        } else {
            if (!rec) {
                strJson += "'-1','name':'','sigin':'0','unit':'','duty':''";
            } else {
                if (rec.length > 0) {
                    var _rid = rec[0].id;
                    var _rname = rec[0].name;
                    var _runit = rec[0].deptment;
                    var _rduty = rec[0].duty;
                    strJson += "'" + _rid + "','name':'" + _rname + "','sigin':'1','unit':'" + _runit + "','duty':'" + _rduty + "'";
                    var time = require('silly-datetime').format(new Date(), 'YYYY-MM-DD HH:mm:ss');
                    var ip_addr = getClientIp(req);
                    var sqlUpdate = "update t_user set lastlogintime=?,lastipaddress=?,sigin=true where id=?";
                    var pam = [time, ip_addr, _rid];
                    mysqlClient.query(sqlUpdate, pam, function (err, rec) {
                        if (err) {
                            console.error(err);
                        }
                    });
                } else {
                    strJson += "'-1','name':'','sigin':'0','unit':'','duty':''";
                }
            }
        }
        strJson += "}";
        res.send(strJson);
        return;
    });
});

/**
 * PC用户退出
 * @param {} req
 * @return {}
 */
router.get('/logout', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var _rid = req.session.user.id;
    var sqlUpdate = "update t_user set sigin=false where id=?";
    var pam = [_rid];
    mysqlClient.query(sqlUpdate, pam, function (err, rec) {
        if (err) {
            console.error(err);
            res.redirect('/');
            return;
        }
        req.session.user = null;
        res.redirect('/');
    });
});

/**
 * APP用户退出
 */
router.get('/applogout', function (req, res, next) {

});


router.post('/updatepassword', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var _rid = req.session.user.id;
    var newpw = req.body.newpw;
    var oldpw = req.body.oldpw;
    var sqlUpdate = "update t_user set password=? where id=? and password=?";
    var pam = [newpw, _rid, oldpw];
    mysqlClient.query(sqlUpdate, pam, function (err, rec) {
        if (err) {
            console.error(err);
            res.send("{'state':-1,'msg':'数据库错误'}");
            return;
        }
        if (rec.affectedRows > 0) {
            res.send("{'state':0}");
        } else {
            res.send("{'state':-1,'msg':'原密码输入错误！'}");
        }

    });
});



router.get('/resetpwd', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var _rid = req.session.user.id;
    var sqlUpdate = "update t_user set password='123456' where id=?";
    var pam = [_rid];
    mysqlClient.query(sqlUpdate, pam, function (err, rec) {
        if (err) {
            console.error(err);
            res.send("{'setpwd':'0'}");
            return;
        }
        res.send("{'setpwd':'1'}");
    });
});

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}


/*
 * 拿到角色的权限ID组
 * */
router.post('/getrole_func', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var role_func = req.session.user.role_func.toString();
    res.send(role_func);
});

/*
 * 根据按钮ID拿到权限ID
 * */
router.post('/getRoleIdByBtnId', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var _add = req.body.add;
    var _edit = req.body.edit;
    var _del = req.body.del;
    var _role = req.body.role;
    var where = "";
    if (_role != null && _role != "") {
        where = "('" + _add + "','" + _edit + "','" + _del + "','" + _role + "')";
    } else {
        where = "('" + _add + "','" + _edit + "','" + _del + "')";
    }
    var addid, editid, delid, roleid;
    var sql = "select * from t_user_function where btnid in " + where;
    var pms = [];
    mysqlClient.query(sql, pms, function (err, recs) {
        if (err) {
            console.log(err);
            res.send("{'state':-1}");
            return;
        }
        var _len = recs.length;
        if (_len > 0) {
            var _row;
            for (var i = 0; i < _len; i++) {
                _row = recs[i];
                if (_row.btnid == _add) addid = _row.id;
                if (_row.btnid == _edit) editid = _row.id;
                if (_row.btnid == _del) delid = _row.id;
                if (_row.btnid == _role) roleid = _row.id;
            }
            var str = "{'add':'" + addid + "','edit':'" + editid + "','del':'" + delid + "','role':'" + roleid + "'}";
            res.send(str);
        } else {
            res.send("");
        }
    });
});


/*
 * 查询用户列表
 * */
router.post('/usersall', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var _keywordMatch = req.body.keywordmatch;
    if (_keywordMatch == null || _keywordMatch == 'undefined')
        _keywordMatch = '';
    _keywordMatch = _keywordMatch.trim();
    var _page = parseInt(req.body.page);
    var _pageSize = parseInt(req.body.limit);
    var _start = parseInt(req.body.start);

    var allsql = "select * from t_deptment;select * from t_user";
    var sql = "select (select count(id) as total from t_user) total,id,loginname,password,name,telphone,charger,sigin,sortorder from t_user";
    var strFilter = '';
    if (_keywordMatch != '') {
        if (strFilter != '') {
            strFilter += ' and (loginname like ?) or (name like ?) ';
        } else {
            strFilter = ' where (loginname like ?) or (name like ?) ';
        }
    }
    sql = sql + strFilter + ' order by sortorder asc limit ?,?';
    var keywordlike = '%' + _keywordMatch + '%';
    var _endrow = _start + _pageSize;
    var pms;
    if (_keywordMatch != '')
        pms = [keywordlike, keywordlike, _start, _pageSize];
    else
        pms = [_start, _pageSize];
    var strsql = "select * from t_user_role_relation";  //查询出用户角色的连接表
    var data = [];
    mysqlClient.query(strsql, function (err, recs) {
        var strJson = "{'data':[";
        if (err) {
            console.log(err);
        } else {
            var _len = recs.length;
            if (_len > 0) {
                var _row;
                for (var i = 0; i < _len; i++) {
                    _row = recs[i];
                    data.push([_row.userid, _row.roleid]);
                }
            }
            mysqlClient.query(allsql, function (e, r) {
                if (e) {
                    console.log(e);
                } else {
                    var l = r[1].length;
                    var unit = r[0];
                    var DataByUnit = [];
                    for (var i = 0; i < unit.length; i++) {
                        var element = unit[i];
                        DataByUnit[element.id] = element.deptmentName;
                    }
                    mysqlClient.query(sql, pms, function (err, recs) {
                        var strJson = '{"rows":[';
                        var sum = 0;
                        if (err) {
                            console.log(err);
                        } else {
                            var _len = recs.length;
                            if (_len > 0) {
                                var _row;
                                for (var i = 0; i < _len; i++) {
                                    var role = "";
                                    _row = recs[i];
                                    if (i == 0)
                                        sum = _row.total;
                                    var chargername = "";
                                    // for (var j = 0; j < l; j++) {
                                    //     if (_row.charger == r[j].id) {
                                    //         chargername = r[j].name;
                                    //     }
                                    // }
                                    for (var j = 0; j < data.length; j++) {
                                        if (data[j][0] == _row.id) {
                                            role = data[j][1];
                                        }
                                    }
                                    var strTemp = '{"id":"' + _row.id +
                                        '","loginname":"' + _row.loginname +
                                        '","password":"' + _row.password +
                                        '","name":"' + _row.name +
                                        '","telphone":"' + _row.telphone +
                                        '","lastlogintime":"' + "" +
                                        '","lastipaddress":"' + "" +
                                        '","charger":"' + chargername +
                                        '","duty":"' + _row.duty +
                                        '","role":"' + role +
                                        '","sortorder":"' + _row.sortorder +
                                        '"}';
                                    if (i < (_len - 1))
                                        strTemp += ",";
                                    strJson += strTemp;
                                }
                            }
                        }
                        strJson += "],'total':" + sum + "}";
                        res.send(strJson);
                    });
                }
            });
        }
    }); //填充数据数组

});


/**
 * @return {string}
 */
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function GetGuid() {
    var str = S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    return str;
}

/*
 * 增加用户
 * */
router.post('/addusers', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var _loginname = req.body.loginname;
    var _password = req.body.password;
    var _name = req.body.name;
    var _role = req.body.role;
    var _deptment = req.body.deptment;
    var _charger = '';
    var _duty = '';
    var _telphone = req.body.telphone;
    var _sortorder = req.body.sortorder;
    var _levelgroup = req.body.levelgroup;
    var _lastlogintime = new Date();
    var _lastipaddress = "";
    var _sigin = 0;
    var id = GetGuid();
    var selid = "select id from t_user where name=?";
    var selpa = [_charger];
    var sql = "insert into t_user(id,loginname,password,name,deptment,charger,telphone,sigin,sortorder) values (?,?,?,?,?,?,?,?,?)";

    var strsql = "insert into t_user_role_relation(id,userid,roleid) values (replace(uuid(),'-',''),?,?)";
    var strparams = [id, _role];
    mysqlClient.query(selid, selpa, function (er, re) {
        if (er) {
            console.log(er);
            res.send("{'state':-1}");
            return;
        }
        if (re.length > 0) {
            _charger = re[0].id;
        } else {
            _charger = "";
        }
        var params = [id, _loginname, _password, _name, _deptment, _charger, _telphone, _sigin, _sortorder];
        mysqlClient.query(sql, params, function (err, recs) {
            if (err) {
                console.log(err);
                res.send("{'state':-1}");
                return;
            }
            mysqlClient.query(strsql, strparams, function (e, r) {
                if (e) {
                    console.log(e);
                    res.send("{'state':-1}");
                    return;
                }
                res.send("{'state':0}");
            });

        });
    });
});

/*
 * 修改用户信息
 * */
router.post('/editusers', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var type = req.body.type;
    var _loginname = req.body.loginname;
    var _password = req.body.password;
    var _name = req.body.name;
    var _role = req.body.role;
    var _deptment = req.body.deptment;
    var _charger = '';
    var _telphone = req.body.telphone;
    var _sortorder = req.body.sortorder;
    var id = req.body.id;
    var guid = GetGuid();
    var sel = "select * from t_user_role_relation where userid = ?"; //链接表里面有没有数据
    var selparams = [id];
    var strsqll = "update t_user_role_relation set roleid = ? where userid = ?"; //更新连接表的数据
    var strparamss = [_role, id];
    var insertsql = "insert into t_user_role_relation(id,userid,roleid) values (?,?,?)"; //插入连接表新数据
    var insertparams = [guid, id, _role];

    var selid = "select id from t_user where name=?";
    var selpa = [_charger];
    var sql = "update t_user set loginname=?,password=?,name=?,deptment=?,charger=?,telphone=?,sortorder=? where id=?";
    mysqlClient.query(selid, selpa, function (er, re) {
        if (er) {
            console.log(err);
            res.send("{'state':-1}");
            return;
        }
        if (re.length > 0) {
            _charger = re[0].id;
        } else {
            _charger = "";
        }
        var params = [_loginname, _password, _name, _deptment, _charger, _telphone, _sortorder, id];
        mysqlClient.query(sql, params, function (err, result) {
            if (err) {
                console.log(err);
                res.send("{'state':-1}");
                return;
            }
            mysqlClient.query(sel, selparams, function (e, r) {
                if (e) {
                    console.log(e);
                    res.send("{'state':-1}");
                    return;
                }
                if (r.length > 0) {
                    mysqlClient.query(strsqll, strparamss, function (e, r) {
                        if (e) {
                            console.log(e);
                            res.send("{'state':-1}");
                            return;
                        }
                        res.send("{'state':0}");
                    });
                } else {
                    mysqlClient.query(insertsql, insertparams, function (e, r) {
                        if (e) {
                            console.log(e);
                            res.send("{'state':-1}");
                            return;
                        }
                        res.send("{'state':0}");
                    });
                }
            });
        });
    });
});

/*
 * 删除用户
 * */
router.post('/deleteusers', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var rows = req.body;
    var sql = 'delete from t_user';
    var strsql = 'delete from t_user_role_relation';
    if (rows instanceof Array) {
        var str = "";
        rows.forEach(function (_row, index, array) {
            if (index != 0) str += ",";
            str += "'" + _row.id + "'";
        });
        sql = sql + " where id in (" + str + ")";
        strsql = strsql + " where id in (" + str + ")";
        var params = [];
        var strparams = [];
        mysqlClient.query(strsql, strparams, function (e, r) {
            if (e) {
                console.log(e);
                res.send("{'state':-1}");
            } else {
                mysqlClient.query(sql, params, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.send("{'state':-1}");
                    } else
                        res.send("{'state':0}");
                });
            }
        });
    } else {
        sql = sql + " where id=?";
        strsql = strsql + " where id=?";
        var params = [req.body.id];
        var strparams = [req.body.id];
        mysqlClient.query(strsql, strparams, function (e, r) {
            if (e) {
                console.log(e);
                res.send("{'state':-1}");
            } else {
                mysqlClient.query(sql, params, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.send("{'state':-1}");
                    } else
                        res.send("{'state':0}");
                });
            }
        });

    }
});

/**
 * 渲染APP功能列表页面
 */
router.get("/appfunction", function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    res.render('sysfunction');
});

/**
 * APP功能路由
 */
router.post("/appfunctionall", function (req, res, next) {
    if (req.session.user == null) {
        res.redirect('/');
        return;
    }
    var _page = parseInt(req.body.page);
    var _pageSize = parseInt(req.body.limit);
    var _start = parseInt(req.body.start);
    var _endrow = _start + _pageSize;

    var sql = "select (select count(id) as total from t_user_function) total,id,funccode,description from t_user_function order by funccode asc limit ?,?";
    var pms = [_start, _pageSize];
    mysqlClient.query(sql, pms, function (err, recs) {
        var strJson = "{\"rows\":[";
        var sum = 0;
        if (err) {
            console.log(err);
        } else {
            var _len = recs.length;
            if (_len > 0) {
                var _row;
                for (var i = 0; i < _len; i++) {
                    _row = recs[i];
                    if (i == 0)
                        sum = _row.total;
                    var strTemp = "{\"id\":\"" + _row.id + "\",\"funccode\":" + _row.funccode + ",\"description\":\"" + _row.description + "\"}";
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
 * 添加APP功能路由
 */
router.post("/addappfunction", function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var _funccode = req.body.funccode;
    var _description = req.body.description;

    var sql = "insert into t_user_function(id,funccode,description) values (replace(uuid(),'-',''),?,?)";
    var params = [_funccode, _description];
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
 * 修改APP功能路由
 */
router.post("/editappfunction", function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }

    var _id = req.body.id;
    var _funccode = req.body.funccode;
    var _description = req.body.description;

    var sql = "update t_user_function set funccode=?,description=? where id=?";
    var params = [_funccode, _description, _id];
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
 * 删除指定ID的APP功能路由
 */
router.post("/deleteappfunction", function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var rows = req.body;
    var sql = 'delete from t_user_function';
    if (rows instanceof Array) {
        var str = "";
        rows.forEach(function (_row, index, array) {
            if (index != 0) str += ",";
            str += "'" + _row.id + "'";
        });
        sql = sql + " where id in (" + str + ")";
        var params = [];
        mysqlClient.query(sql, params, function (err, result) {
            if (err) {
                console.log(err);
                res.send("{'state':-1}");
            } else
                res.send("{'state':0}");
        });
    } else {
        sql = sql + " where id=?";
        var params = [req.body.id];
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
 * 渲染用户角色管理页面
 */
router.get("/userrole", function (req, res, next) {
    var b = GetUserPermissions(req);
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
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var _page = parseInt(req.body.page);
    var _pageSize = parseInt(req.body.limit);
    var _start = parseInt(req.body.start);
    var _endrow = _start + _pageSize;

    var sql = "select (select count(id) as total from t_user_role) total,id,rolename,description,parentid from t_user_role limit ?,?";
    var pms = [_start, _pageSize];
    mysqlClient.query(sql, pms, function (err, recs) {
        var strJson = "{\"rows\":[";
        var sum = 0;
        if (err) {
            console.log(err);
        } else {
            var _len = recs.length;
            if (_len > 0) {
                var _row;
                for (var i = 0; i < _len; i++) {
                    _row = recs[i];
                    if (i == 0)
                        sum = _row.total;
                    var strTemp = "{\"id\":\"" + _row.id +
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
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var _rolename = req.body.rolename;
    var _description = req.body.description;
    var _parentid = req.body.parentid;
    var sql = "insert into t_user_role(id,rolename,description,parentid) values (replace(uuid(),'-',''),?,?,?)";
    var params = [_rolename, _description, _parentid];
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
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }

    var _id = req.body.id;
    var _rolename = req.body.rolename;
    var _description = req.body.description;
    var _parentid = req.body.parentid;
    var sql = "update t_user_role set rolename=?,description=?,parentid=? where id=?";
    var params = [_rolename, _description, _parentid, _id];
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
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var rows = req.body;
    var sql = 'delete from t_user_role';
    if (rows instanceof Array) {
        var str = "";
        rows.forEach(function (_row, index, array) {
            if (index != 0) str += ",";
            str += "'" + _row.id + "'";
        });
        sql = sql + " where id in (" + str + ")";
        var params = [];
        mysqlClient.query(sql, params, function (err, result) {
            if (err) {
                console.log(err);
                res.send("{'state':-1}");
            } else
                res.send("{'state':0}");
        });
    } else {
        sql = sql + " where id=?";
        var params = [req.body.id];
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
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var _roleid = req.body.roleid;
    if (_roleid == null || '' == _roleid || 'undefined' == _roleid) {
        res.send("{\"rows\":[]}");
        return;
    }
    var sql = "select a.id,a.funccode,a.description from t_user_function a left join t_role_function_map b on b.funcid=a.id where b.roleid=? order by a.funccode asc";
    var params = [_roleid];
    mysqlClient.query(sql, params, function (err, recs) {
        var strJson = "{\"rows\":[";
        if (err) {
            console.log(err);
        } else {
            var _len = recs.length;
            if (_len > 0) {
                var _row;
                for (var i = 0; i < _len; i++) {
                    _row = recs[i];
                    var strTemp = "{\"id\":\"" + _row.id + "\",\"funccode\":" + _row.funccode + ",\"description\":\"" + _row.description + "\"}";
                    if (i < (_len - 1))
                        strTemp += ",";
                    strJson += strTemp;
                }
            }
        }
        strJson += "]}";
        res.send(strJson);
    });
});

router.post("/saverolefunc", function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var rows = req.body;
    var _roleid, _funcid;
    var sqlDelete = "";
    var sql = "";
    var sqlTmpValues = "";
    var params = [];
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

/*
 * 得到users页面所需要的用户组信息
 * */
router.post("/userrolealldata", function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var sql = "select * from t_user_role";
    var pms = [];
    mysqlClient.query(sql, pms, function (err, recs) {
        var strJson = "{\"rows\":[";
        var sum = 0;
        if (err) {
            console.log(err);
        } else {
            var _len = recs.length;
            if (_len > 0) {
                var _row;
                for (var i = 0; i < _len; i++) {
                    _row = recs[i];
                    if (i == 0)
                        sum = _row.total;
                    var strTemp = "{\"id\":\"" + _row.id + "\",\"rolename\":\"" + _row.rolename + "\",\"description\":\"" + _row.description + "\"}";
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
 * 渲染单位管理页面
 */
router.get("/userunit", function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    res.render("userunit");
});

/**
 * 列出所有单位路由
 */
router.post("/unitall", function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var _page = parseInt(req.body.page);
    var _pageSize = parseInt(req.body.limit);
    var _start = parseInt(req.body.start);
    var _endrow = _start + _pageSize;

    var sql = "select (select count(id) as total from t_deptment) total,id,deptmentName,charger from t_deptment  order by sortorder asc  limit ?,?;"
        + "select * from t_user";
    var pms = [_start, _pageSize];
    mysqlClient.query(sql, pms, function (err, r) {
        var strJson = "{\"rows\":[";
        var sum = 0;
        if (err) {
            console.log(err);
        } else {
            var recs = r[0]; //单位信息。
            var users = r[1];//人员信息
            var dataByUser = [];
            for (var i = 0; i < users.length; i++) {
                var element = users[i];
                dataByUser[element.id] = element.name;
            }
            var _len = recs.length;
            if (_len > 0) {
                var _row;
                for (var i = 0; i < _len; i++) {
                    _row = recs[i];
                    if (i == 0)
                        sum = _row.total;
                    _row.charger = _row.charger == null ? "" : _row.charger
                    var strTemp = "{\"id\":\"" + _row.id +
                        "\",\"deptmentName\":\"" + _row.deptmentName +
                        "\",\"charger\":\"" + _row.charger +
                        "\",\"chargerName\":\"" + dataByUser[_row.charger] +
                        "\",\"sortorder\":" + _row.sortorder +
                        "}";
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
router.post("/addunit", function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var deptment = req.body.deptmentName;
    var createtime = new Date().toLocaleString();
    var charger = req.body.charger;
    var sql = "insert into t_deptment(id,deptmentName,charger) values (replace(uuid(),'-',''),?,?)";
    var params = [deptment, charger];
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
router.post("/editunit", function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var _id = req.body.id;
    var deptment = req.body.deptmentName;
    var charger = req.body.charger;
    var sql = "update t_deptment set deptmentName=?,charger=? where id=?";
    var params = [deptment, charger, _id];
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
router.post("/deleteunit", function (req, res, next) {
    if (req.session.user == null) {
        res.redirect('/');
        return;
    }
    if (req.session.user == null) {
        res.redirect('/');
        return;
    }
    var rows = req.body;
    var sql = 'delete from t_deptment';
    if (rows instanceof Array) {
        var str = "";
        rows.forEach(function (_row, index, array) {
            if (index != 0) str += ",";
            str += "'" + _row.id + "'";
        });
        sql = sql + " where id in (" + str + ")";
        var params = [];
        mysqlClient.query(sql, params, function (err, result) {
            if (err) {
                console.log(err);
                res.send("{'state':-1}");
            } else
                res.send("{'state':0}");
        });
    } else {
        sql = sql + " where id=?";
        var params = [req.body.id];
        mysqlClient.query(sql, params, function (err, result) {
            if (err) {
                console.log(err);
                res.send("{'state':-1}");
            } else
                res.send("{'state':0}");
        });
    }
});


/*
 * 得到users页面所需要的用户组信息
 * */
router.post("/deptmentalldata", function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var sql = "select * from t_deptment";
    var pms = [];
    mysqlClient.query(sql, pms, function (err, recs) {
        var strJson = "{\"rows\":[";
        var sum = 0;
        if (err) {
            console.log(err);
        } else {
            var _len = recs.length;
            if (_len > 0) {
                var _row;
                for (var i = 0; i < _len; i++) {
                    _row = recs[i];
                    if (i == 0)
                        sum = _row.total;
                    var strTemp = "{\"id\":\"" + _row.id +
                        "\",\"deptment\":\"" + _row.deptmentName +
                        "\",\"groupby\":\"" + _row.charger +
                        "\"}";
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

router.post('/getuserall', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var sql = "select * from t_user";
    var pms = [];
    mysqlClient.query(sql, pms, function (err, recs) {
        var strJson = "{\"rows\":[";
        var sum = 0;
        if (err) {
            console.log(err);
        } else {
            var _len = recs.length;
            if (_len > 0) {
                var _row;
                for (var i = 0; i < _len; i++) {
                    _row = recs[i];
                    if (i == 0)
                        sum = _row.total;
                    var strTemp = "{\"id\":\"" + _row.id +
                        "\",\"name\":\"" + _row.name +
                        "\"}";
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
module.exports = router;
