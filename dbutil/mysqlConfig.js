/**
 * MYSQL数据库配置
 */
var mysqlCfg = {};

mysqlCfg.poollimit = 80;
// mysqlCfg.host = '192.168.84.49';
// mysqlCfg.user = 'shawnx';
// mysqlCfg.password = '!@#$%^';
// mysqlCfg.host = '192.168.84.78';
mysqlCfg.host = 'localhost';
mysqlCfg.user = 'root';
mysqlCfg.password = '123456';
mysqlCfg.database = 'parkingguidance';

module.exports = mysqlCfg;