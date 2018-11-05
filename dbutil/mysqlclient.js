var sqlclient = module.exports;
var NND = {};
var async = require('async');
var _pool = null;
var _sybasepool = null;

var db = {};








/**
 * 初始化一个连接池
 */
db.initPool = function () {
  if (!_pool)
    _pool = require('./mypool').createMySqlPool();
};





/* db.insertSybase = function(sqltext,func){
    _sybasepool.acquire().then(conn=>{
        conn.insert(sqltext,(err,rs)=>{
            func(err,rs);
           _sybasepool.release(conn);
        });
    }).catch(function(err){
        console.log(err);
    });
}; */







/*
 * Innit sql connection pool
 * [@param](/user/param) {Object} app The app for the server.
 */
NND.init = function () {
  if (!_pool)
    _pool = require('./mypool').createMySqlPool();
};

/**
 * Excute sql statement
 * [@param](/user/param) {String} sql Statement The sql need to excute.
 * [@param](/user/param) {Object} args The args for the sql.
 * [@param](/user/param) {fuction} callback Callback function.
 */
NND.query = function (sql, args, callback) {
  _pool.getConnection(function (err, client) {
    if (!!err) {
      console.error('[sqlqueryErr] ' + err.stack);
      return;
    }
    client.query(sql, args, function (err, res) {
      _pool.releaseConnection(client);
      callback.apply(null, [err, res]);
    });
  });
};



NND.beginTransaction = function (sql, args, callback) {
  _pool.getConnection(function (err, client) {
    if (!!err) {
      console.error('[sqlqueryErr] ' + err.stack);
      return;
    }
    // 开始事务
    client.beginTransaction(function (err) {
      if (err) {
        console.log(err);
      }
      async.parallel([
        function (callback) {
          client.query(sql, args, callback);
        }]
        , function (err, result) {
          if (err) {
            client.rollback(function () {
              _pool.releaseConnection(client);
              callback.apply(null, [err, result[0][0]]);
            });
            return;
          }
          // 提交事务
          client.commit(function (err) {
            if (err) {
              client.rollback(function () {
                _pool.releaseConnection(client);
                callback.apply(null, [err, result[0][0]]);
              });
              return;
            }
            _pool.releaseConnection(client);
            callback.apply(null, [err, result[0][0]]);
          });
        });
    });
  });
};

/**
 * Close connection pool.
 */
NND.shutdown = function () {
  _pool.end();
};

/**
 * init database
 */
sqlclient.init = function () {
  if (!!_pool) {
    return sqlclient;
  } else {
    NND.init();
    sqlclient.insert = NND.beginTransaction;
    sqlclient.update = NND.beginTransaction;
    //sqlclient.delete = NND.query;
    sqlclient.query = NND.beginTransaction;
    return sqlclient;
  }
};

/**
 * shutdown database
 */
sqlclient.shutdown = function () {
  NND.shutdown();
};