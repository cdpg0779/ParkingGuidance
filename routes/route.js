/**
 * 人员路线控制路由
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


/* 渲染route页面 */
router.get('/', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    res.render('route');
});



router.post('/getUsers', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var userid = req.session.user.id;
    var sql_user = "select * from t_user_role_relation;" +
        "select * from t_user_role";
    var pms_user = [userid];
    mysqlClient.query(sql_user, pms_user, function (err, recs) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        var dataByUser = [];
        var dataByrelation = [];
        var dataByrole = [];
        if (recs[0].length > 0) {
            for (var i = 0; i < recs[0].length; i++) {
                var element = recs[0][i];
                dataByrelation.push({ userid: element.userid, roleid: element.roleid });
            }
        }
        if (recs[1].length > 0) {
            for (var i = 0; i < recs[1].length; i++) {
                var element = recs[1][i];
                dataByrole.push({ id: element.id, parentid: element.parentid });
            }
        }
        var roleid = dataByrelation.find(x => x.userid == userid).roleid;
        var ids_roleid = '';
        ids_roleid = getallchidenRole(ids_roleid, roleid, dataByrole);
        var ids = "'" + userid + "'";
        for (var i = 0; i < dataByrelation.length; i++) {
            var element = dataByrelation[i];
            if (ids_roleid.indexOf(element.roleid) > -1) {
                ids += ",'" + element.userid + "'";
            }
        }
        var sql = "SELECT t_user.id,t_user.name,t_deptment.deptmentName FROM" +
            " t_user INNER JOIN t_deptment ON t_deptment.id = t_user.deptment" +
            " where t_user.id in (" + ids + ") order by t_deptment.sortorder,t_user.sortorder asc";
        var pms = [];
        mysqlClient.query(sql, pms, function (e, r) {
            if (e) {
                console.log(e);
                res.send(e);
                return;
            }
            if (r.length > 0) {
                var dataByRenturn = [];
                for (var i = 0; i < r.length; i++) {
                    var element = r[i];
                    if (dataByRenturn.length == 0) {
                        dataByRenturn.push({ deptmentName: element.deptmentName, data: [{ id: element.id, name: element.name }] });
                    } else {
                        if (dataByRenturn.find(x => x.deptmentName == element.deptmentName) != null) {
                            var model = dataByRenturn.find(x => x.deptmentName == element.deptmentName);
                            model.data.push({ id: element.id, name: element.name });
                        } else {
                            dataByRenturn.push({ deptmentName: element.deptmentName, data: [{ id: element.id, name: element.name }] });
                        }
                    }
                }
                var strjson = { rows: dataByRenturn };
                strjson = JSON.stringify(strjson);
                res.send(strjson);
            }
        });
    });
});







//得到所有的下属角色ID。
function getallchidenRole(ids, roleid, dataByrole) {
    for (var i = 0; i < dataByrole.length; i++) {
        var element = dataByrole[i];
        if (element.parentid == roleid) {
            if (ids == "")
                ids = "'" + element.id + "'";
            else
                ids += ",'" + element.id + "'";
            ids = getallchidenRole(ids, element.id, dataByrole);
        }
    }
    return ids;
}




module.exports = router;