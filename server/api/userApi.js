/* eslint-disable no-console */
var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');
var fs = require("fs");
var moment = require("moment");
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
router.post('/getAll', (req, res) => {
    var sql = $sql.events.getAll;
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }
        if(result&&result.length) {
            var times = [];
            for (let i = 0; i < result.length; i++) {
                const element = result[i].startTime;
                times.push(moment(element).format("YYYY年M月D日"));
            }
            jsonWrite(res,times);
            console.log(times)
        }
    })
})
//查询下一个点
router.post('/getNextPoint',(req, res) => {
    var sql = $sql.events.getNext;
    var params = req.body;
    conn.query(sql, [params.time], function(err, result) {
        if (err) {
            console.log(err);
        }
        if(result&&result.length) {
            if (result[0].address == undefined) {
                result[0].startTime = moment(result[0].startTime).format("YYYY-MM-DD");
                jsonWrite(res,result[0]);
            } else {
            var imgUrl = result[0].imgUrl;
            var imageData = fs.readFileSync("E:\\della\\Desktop\\first-vue\\server"+imgUrl); // 例：fileUrl="D:\\test\\test.bmp"
            var imageBase64 = imageData.toString("base64");
            result[0].img = imageBase64;
            result[0].startTime = moment(result[0].startTime).format("YYYY-MM-DD");
            result[0].endTime = moment(result[0].endTime).format("YYYY-MM-DD");
            jsonWrite(res,result[0]);
            console.log(result[0].startTime)
            }
        }
    })
})
module.exports = router;