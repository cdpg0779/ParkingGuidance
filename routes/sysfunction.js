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
 * 渲染功能列表页面
 */
router.get("/", function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    res.render('sysfunction');
});


/**
 * 功能路由列表
 */
router.post("/appfunctionall", function (req, res, next) {
    if (req.session.user == null) {
        res.redirect('/');
        return;
    }
    let _page = parseInt(req.body.page);
    let _pageSize = parseInt(req.body.limit);
    let _start = parseInt(req.body.start);
    let _endrow = _start + _pageSize;

    let sql = "select (select count(id) as total from t_user_function) total,t_user_function.* from t_user_function order by orderby asc limit ?,?";
    let pms = [_start, _pageSize];
    mysqlClient.query(sql, pms, function (err, recs) {
        let sum = 0;
        let ren = { state: 0, rows: [], total: 0 };
        if (err) {
            console.log(err);
        } else {
            let _len = recs.length;
            if (_len > 0) {
                sum = recs[0].total
            }
            ren.total = sum;
            ren.rows = recs;
        }
        res.send(JSON.stringify(ren));
    });
});


/**
 * 添加功能路由
 */
router.post("/addfunction", function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let btnid = req.body.btnid;
    let _description = req.body.description;
    let type = req.body.type;
    let IframeId = req.body.IframeId;
    let IframeName = req.body.IframeName;
    let IframeSrc = req.body.IframeSrc;
    let ItemId = req.body.ItemId;
    let ParentsDir = req.body.ParentsDir;
    let ParentsId = req.body.ParentsId;
    let orderby = req.body.orderby;
    let remark = req.body.remark;

    let sql = "insert into t_user_function(id,btnid,description,type,IframeId,IframeName,IframeSrc,ItemId,ParentsDir,ParentsId,orderby,remark) values (replace(uuid(),'-',''),?,?,?,?,?,?,?,?,?,?,?)";
    let params = [btnid, _description, type, IframeId, IframeName, IframeSrc, ItemId, ParentsDir, ParentsId, orderby, remark];
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
 * 修改功能路由
 */
router.post("/editfunction", function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }

    let _id = req.body.id;
    let btnid = req.body.btnid;
    let _description = req.body.description;
    let type = req.body.type;
    let IframeId = req.body.IframeId;
    let IframeName = req.body.IframeName;
    let IframeSrc = req.body.IframeSrc;
    let ItemId = req.body.ItemId;
    let ParentsDir = req.body.ParentsDir;
    let ParentsId = req.body.ParentsId;
    let orderby = req.body.orderby;
    let remark = req.body.remark;

    let sql = "update t_user_function set btnid=?,description=?,type=?,IframeId=?,IframeName=?,IframeSrc=?,ItemId=?,ParentsDir=?,ParentsId=?,orderby=?,remark=? where id=?";
    let params = [btnid, _description, type, IframeId, IframeName, IframeSrc, ItemId, ParentsDir, ParentsId, orderby, remark, _id];
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
 * 删除指定ID的功能路由
 */
router.post("/deletefunction", function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let rows = req.body;
    let sql = 'delete from t_user_function';
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


module.exports = router;
