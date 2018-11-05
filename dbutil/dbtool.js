var DBTool = {};

/**
 * createTask:建任务
 * distributed:派发
 * complaint:转办
 * undo:撤销
 * over:办结
 * other:重办
 * receive:接收
 */
DBTool.State = {
    createTask: 0,
    distributed: 1,
    complaint: 2,
    undo: 3,
    over: 4,
    other: 5,
    receive: 6
}


/**
 * 获取本机IP
 */
DBTool.getIPAdress = function () {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

/**
 * 替换字符串中的原始回车换行符
 * @param {} strContent
 * @return {}
 */
DBTool.replaceNewLine = function (strContent) {
	var regR = /\r/g;
	var regN = /\n/g;
	var regT = /\t/g;
	var regSimon = /\"/g;
	var regSpSign = //g;
	var regP = /\\/g;
	var newContent = strContent.replace(regR, "").replace(regN, "").replace(regT, "").replace(regSimon, "'").replace(regSpSign, "").replace(regP, "");
	return newContent;
};

/**
 *得到Guid
 * @return {string}
 */
DBTool.GetGuid = function () {
    var str = DBTool.S4() + DBTool.S4() + DBTool.S4() + DBTool.S4() + DBTool.S4() + DBTool.S4() + DBTool.S4() + DBTool.S4();
    return str;
}
DBTool.S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}



/**
 *得到递归查找用户信息
 * @return {string} 
 */
DBTool.getusersid = function (strJson, parentid, r) {
    var data = [];
    for (var i = 0; i < r.length; i++) {
        var element = r[i];
        if (element.parentid == parentid) {
            if (data.indexOf(element.roleid) == -1) {
                data.push(element.roleid);
            }
            if (strJson == "") {
                strJson = "[{'rolename':'" + element.rolename +
                    "','name':'" + element.name +
                    "','id':'" + element.id +
                    "','unit':'" + element.unit + "'}";
            } else {
                strJson += ",{'rolename':'" + element.rolename +
                    "','name':'" + element.name +
                    "','id':'" + element.id +
                    "','unit':'" + element.unit + "'}";
            }
        }
    }
    if (data.length > 0) {
        for (var j = 0; j < data.length; j++) {
            var id = data[j];
            strJson = DBTool.getusersid(strJson, id, r);
        }
    }
    return strJson;
}


/**
 *得到递归查找用户信息--分管领导
 * @return {string} 
 */
DBTool.getusersidByCharger = function (strJson, Chargerid, r) {
    var data = [];
    for (var i = 0; i < r.length; i++) {
        var element = r[i];
        if (element.charger == Chargerid) {
            if (data.indexOf(element.id) == -1) {
                data.push(element.id);
            }
            if (element.rolename != "管理员" && element.rolename != "内容管理员") {
                if (strJson == "") {
                    strJson = "[{'rolename':'" + element.rolename +
                        "','name':'" + element.name +
                        "','id':'" + element.id +
                        "','unit':'" + element.unit + "'}";
                } else {
                    strJson += ",{'rolename':'" + element.rolename +
                        "','name':'" + element.name +
                        "','id':'" + element.id +
                        "','unit':'" + element.unit + "'}";
                }
            }
        }
    }
    if (data.length > 0) {
        for (var j = 0; j < data.length; j++) {
            var id = data[j];
            strJson = DBTool.getusersidByCharger(strJson, id, r);
        }
    }
    return strJson;
}


/**
 * 替换字符串中的原始回车换行符
 * @param {} strContent
 * @return {}
 */
DBTool.replaceNewLine = function (strContent) {
    var regR = /\r/g;
    var regN = /\n/g;
    var newContent = strContent.replace(regR, "\\r").replace(regN, "\\n");
    return newContent;
}

/**
 * 获取系统当前时间 2017-06-02 10:20:13
 */
DBTool.getNow = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

/**
 * 获取系统当前时间 2017-06
 */
DBTool.getNowMonth = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    return year + '-' + month;
}


DBTool.getDate = function (d) {
    var re = "";
    if (d != "" && d != null && d) {
        var date = new Date(d);
        var year = date.getFullYear();
        var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        if (year == new Date().getFullYear()) re = month + '-' + day + ' ' + hour + ':' + minute;
        else re = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }
    return re;
}

module.exports = DBTool;
