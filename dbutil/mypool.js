var mysql = require('mysql');
var myCfg = require('./mysqlConfig');

exports.createMySqlPool = module.exports.createMySqlPool = function () {
	return mysql.createPool({
		connectionLimit: myCfg.poollimit,
		host: myCfg.host,
		user: myCfg.user,
		password: myCfg.password,
		database: myCfg.database,
		multipleStatements: true
	});
}

