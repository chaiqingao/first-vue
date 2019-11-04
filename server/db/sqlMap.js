var sqlMap = {
    point: {
        getNext: 'select * from point where time > ? order by time limit 1'
    }
}

module.exports = sqlMap;