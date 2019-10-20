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
router.post('/login',(req, res) => {
    var sql = $sql.user.select;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.account], function(err,result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            //console.log(result.body.password===params.password);
            if (result.length === 0) {
                jsonWrite(res, 0)
            } else if (result[0].password === params.password) {
                jsonWrite(res, 1)
            } else {
                jsonWrite(res, -1);
            }
        }
    });
});

module.exports = router;