/* eslint-disable no-console */
var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
}

//增加用户接口
router.post('/addUser',(req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.userName, params.age], function(err,result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res,result);
        }
    });
});

module.exports = router;