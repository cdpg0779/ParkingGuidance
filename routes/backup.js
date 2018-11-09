/**
 * CMS用户相关控制路由
 */
var express = require('express');
var DBbackup = require('../dbutil/dbbackup');
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

router.get('/', function (req, res, next) {
    let b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    res.render('backup');
});

//得到数据库备份情况列表
router.post('/backupall', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let _pageSize = parseInt(req.body.limit);
    let _start = parseInt(req.body.start);
    DBbackup.backupall(_start, _pageSize, res);
});


//删除数据库备份记录
router.post('/deleteBackup', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    let rows = req.body;
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


router.post('/backupDataOnlyOne', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var userid = req.session.user.id;
    DBbackup.backupDataOnlyOne(userid, res);
});

router.post('/backupDataTiming', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    var userid = req.session.user.id;
    var interval = req.body;
    DBbackup.backupDataTiming(userid, interval, res);
});

//得到当前最近一次设置的自动更新参数
router.post('/getBackupConfig', function (req, res, next) {
    var b = GetUserPermissions(req);
    if (!b) {
        res.redirect('/');
        return;
    }
    DBbackup.getBackupConfig(res);
});


module.exports = router;
