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


/* GET users listing. */
router.get('/', function (req, res, next) {
    let b = GetUserPermissions(req);
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
    let _usrname = req.query.usr;
    let _pwd = req.query.pwd;
    //mysqlClient.init();
    let sql = "select t_user.* from" +
        " t_user" +
        " where loginname=? and password=?";
    let args = [_usrname, _pwd];
    mysqlClient.query(sql, args, function (err, rec) {
        //res.clearCookie('uid');
        req.session.user = null;
        let strJson = "{'id':";
        if (err) {
            strJson += "'-1','name':'','sigin':'0','unit':'','duty':'','role':''}";
        } else {
            if (!rec) {
                strJson += "'-1','name':'','sigin':'0','unit':'','duty':'','role':''}";
            } else {
                if (rec.length > 0) {
                    let _rid = rec[0].id;
                    let _rname = rec[0].name;
                    let _runit = rec[0].deptmentName;
                    let _rduty = rec[0].duty;
                    let _unitid = rec[0].deptmentid;
                    let sql_role = "select roleid from t_user_role_relation where userid=?";
                    let params_role = [_rid];
                    mysqlClient.query(sql_role, params_role, function (err_role, recs_role) {
                        if (err_role) {
                            console.log(err_role);
                        } else {
                            if (recs_role.length > 0) {
                                let role = recs_role[0].roleid;
                                let sql_role_fun = "select * from t_role_function_map where roleid=?";
                                let params_role_fun = [role];
                                mysqlClient.query(sql_role_fun, params_role_fun, function (e, r) {
                                    if (e) {
                                        console.log(e);
                                    } else {
                                        let data = [];
                                        let _len = r.length;
                                        if (_len > 0) {
                                            let _row;
                                            for (let i = 0; i < _len; i++) {
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
    let _usrname = req.query.usr;
    let _pwd = req.query.pwd;
    //mysqlClient.init();
    let sql = "select * from t_user where loginname=? and password=? and deptment!='manager'";
    let args = [_usrname, _pwd];
    mysqlClient.query(sql, args, function (err, rec) {
        let strJson = "{'id':";
        if (err) {
            strJson += "'-1','name':'','sigin':'0','unit':'','duty':''";
        } else {
            if (!rec) {
                strJson += "'-1','name':'','sigin':'0','unit':'','duty':''";
            } else {
                if (rec.length > 0) {
                    let _rid = rec[0].id;
                    let _rname = rec[0].name;
                    let _runit = rec[0].deptment;
                    let _rduty = rec[0].duty;
                    strJson += "'" + _rid + "','name':'" + _rname + "','sigin':'1','unit':'" + _runit + "','duty':'" + _rduty + "'";
                    let time = require('silly-datetime').format(new Date(), 'YYYY-MM-DD HH:mm:ss');
                    let ip_addr = getClientIp(req);
                    let sqlUpdate = "update t_user set lastlogintime=?,lastipaddress=?,sigin=true where id=?";
                    let pam = [time, ip_addr, _rid];
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
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let _rid = req.session.user.id;
    let sqlUpdate = "update t_user set sigin=false where id=?";
    let pam = [_rid];
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
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let _rid = req.session.user.id;
    let newpw = req.body.newpw;
    let oldpw = req.body.oldpw;
    let sqlUpdate = "update t_user set password=? where id=? and password=?";
    let pam = [newpw, _rid, oldpw];
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
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let _rid = req.session.user.id;
    let sqlUpdate = "update t_user set password='123456' where id=?";
    let pam = [_rid];
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
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let role_func = req.session.user.role_func.toString();
    res.send(role_func);
});

/*
 * 根据按钮ID拿到权限ID
 * */
router.post('/getRoleIdByBtnId', function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let _add = req.body.add;
    let _edit = req.body.edit;
    let _del = req.body.del;
    let _role = req.body.role;
    let where = "";
    if (_role != null && _role != "") {
        where = "('" + _add + "','" + _edit + "','" + _del + "','" + _role + "')";
    } else {
        where = "('" + _add + "','" + _edit + "','" + _del + "')";
    }
    let addid, editid, delid, roleid;
    let sql = "select * from t_user_function where btnid in " + where;
    let pms = [];
    mysqlClient.query(sql, pms, function (err, recs) {
        if (err) {
            console.log(err);
            res.send("{'state':-1}");
            return;
        }
        let _len = recs.length;
        if (_len > 0) {
            let _row;
            for (let i = 0; i < _len; i++) {
                _row = recs[i];
                if (_row.btnid == _add) addid = _row.id;
                if (_row.btnid == _edit) editid = _row.id;
                if (_row.btnid == _del) delid = _row.id;
                if (_row.btnid == _role) roleid = _row.id;
            }
            let str = "{'add':'" + addid + "','edit':'" + editid + "','del':'" + delid + "','role':'" + roleid + "'}";
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
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let _keywordMatch = req.body.keywordmatch;
    if (_keywordMatch == null || _keywordMatch == 'undefined')
        _keywordMatch = '';
    _keywordMatch = _keywordMatch.trim();
    let _page = parseInt(req.body.page);
    let _pageSize = parseInt(req.body.limit);
    let _start = parseInt(req.body.start);

    let sql = "select (select count(id) as total from t_user) total,id,loginname,password,name,telphone,charger,sigin,sortorder from t_user";
    let strFilter = '';
    if (_keywordMatch != '') {
        if (strFilter != '') {
            strFilter += ' and (loginname like ?) or (name like ?) ';
        } else {
            strFilter = ' where (loginname like ?) or (name like ?) ';
        }
    }
    sql = sql + strFilter + ' order by sortorder asc limit ?,?';
    let keywordlike = '%' + _keywordMatch + '%';
    let _endrow = _start + _pageSize;
    let pms;
    if (_keywordMatch != '')
        pms = [keywordlike, keywordlike, _start, _pageSize];
    else
        pms = [_start, _pageSize];
    let strsql = "select * from t_user_role_relation";  //查询出用户角色的连接表
    let data = [];
    mysqlClient.query(strsql, function (err, recs) {
        let strJson = "{'data':[";
        if (err) {
            console.log(err);
        } else {
            let _len = recs.length;
            if (_len > 0) {
                let _row;
                for (let i = 0; i < _len; i++) {
                    _row = recs[i];
                    data.push([_row.userid, _row.roleid]);
                }
            }

            mysqlClient.query(sql, pms, function (err, recs) {
                let strJson = '{"rows":[';
                let sum = 0;
                if (err) {
                    console.log(err);
                } else {
                    let _len = recs.length;
                    if (_len > 0) {
                        let _row;
                        for (let i = 0; i < _len; i++) {
                            let role = "";
                            let roleName = "";
                            _row = recs[i];
                            if (i == 0)
                                sum = _row.total;
                            let chargername = "";
                            // for (let j = 0; j < l; j++) {
                            //     if (_row.charger == r[j].id) {
                            //         chargername = r[j].name;
                            //     }
                            // }
                            for (let j = 0; j < data.length; j++) {
                                if (data[j][0] == _row.id) {
                                    role = data[j][1];
                                }
                            }
                            let strTemp = '{"id":"' + _row.id +
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
    }); //填充数据数组

});


/**
 * @return {string}
 */
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function GetGuid() {
    let str = S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    return str;
}

/*
 * 增加用户
 * */
router.post('/addusers', function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let _loginname = req.body.loginname;
    let _password = req.body.password;
    let _name = req.body.name;
    let _role = req.body.role;
    let _charger = '';
    let _duty = '';
    let _telphone = req.body.telphone;
    let _sortorder = req.body.sortorder;
    let _levelgroup = req.body.levelgroup;
    let _lastlogintime = new Date();
    let _lastipaddress = "";
    let _sigin = 0;
    let id = GetGuid();
    let selid = "select id from t_user where name=?";
    let selpa = [_charger];
    let sql = "insert into t_user(id,loginname,password,name,charger,telphone,sigin,sortorder) values (?,?,?,?,?,?,?,?)";

    let strsql = "insert into t_user_role_relation(id,userid,roleid) values (replace(uuid(),'-',''),?,?)";
    let strparams = [id, _role];
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
        let params = [id, _loginname, _password, _name, _charger, _telphone, _sigin, _sortorder];
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
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let type = req.body.type;
    let _loginname = req.body.loginname;
    let _password = req.body.password;
    let _name = req.body.name;
    let _role = req.body.role;
    let _charger = '';
    let _telphone = req.body.telphone;
    let _sortorder = req.body.sortorder;
    let id = req.body.id;
    let guid = GetGuid();
    let sel = "select * from t_user_role_relation where userid = ?"; //链接表里面有没有数据
    let selparams = [id];
    let strsqll = "update t_user_role_relation set roleid = ? where userid = ?"; //更新连接表的数据
    let strparamss = [_role, id];
    let insertsql = "insert into t_user_role_relation(id,userid,roleid) values (?,?,?)"; //插入连接表新数据
    let insertparams = [guid, id, _role];

    let selid = "select id from t_user where name=?";
    let selpa = [_charger];
    let sql = "update t_user set loginname=?,password=?,name=?,charger=?,telphone=?,sortorder=? where id=?";
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
        let params = [_loginname, _password, _name, _charger, _telphone, _sortorder, id];
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
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let rows = req.body;
    let sql = 'delete from t_user';
    let strsql = 'delete from t_user_role_relation';
    if (rows instanceof Array) {
        let str = "";
        rows.forEach(function (_row, index, array) {
            if (index != 0) str += ",";
            str += "'" + _row.id + "'";
        });
        sql = sql + " where id in (" + str + ")";
        strsql = strsql + " where id in (" + str + ")";
        let params = [];
        let strparams = [];
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
        let params = [req.body.id];
        let strparams = [req.body.id];
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






/*
 * 得到users页面所需要的用户组信息
 * */
router.post("/userrolealldata", function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let sql = "select * from t_user_role";
    let pms = [];
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
                    let strTemp = "{\"id\":\"" + _row.id + "\",\"rolename\":\"" + _row.rolename + "\",\"description\":\"" + _row.description + "\"}";
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




//得到所有用户的ID和姓名
router.post('/getuserall', function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let sql = "select * from t_user";
    let pms = [];
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




//得到所有父节点
router.post("/getParentsFunction", function (req, res, next) {
    let sql = "select * from t_user_function where ParentsId='1' and type='jiedian' order by orderby asc";
    mysqlClient.query(sql, [], function (err, recs) {
        if (err) {
            console.log(err);
            res.send("{'state':-1}");
            return;
        }
        let ren = { state: 0, rows: [] }
        let data = [];
        for (let i = 0; i < recs.length; i++) {
            let element = recs[i];
            data.push({ id: element.id, name: element.description });
        }
        ren.rows = data;
        res.send(JSON.stringify(ren));
    });
});

//得到指定用户所拥有的菜单节点访问权限
router.post('/GetMenuList', function (req, res, next) {
    let userid = req.body.userid;
    let sql = "SELECT t_user_function.* from t_user_function WHERE t_user_function.id IN ( " +
        "SELECT funcid FROM t_role_function_map WHERE roleid = ( SELECT roleid FROM t_user_role_relation WHERE userid = '" + userid + "') " +
        ") and t_user_function.type='jiedian' and t_user_function.ParentsId!='1'";
    mysqlClient.query(sql, [], function (err, recs) {
        if (err) {
            console.log(err);
            res.send("{'state':-1}");
            return;
        }
        let ren = { state: 0, rows: recs };
        res.send(JSON.stringify(ren));
    });
});

module.exports = router;
