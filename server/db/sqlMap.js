var sqlMap = {
    point: {
        getNext: 'select * from point where startTime > ? order by startTime limit 1'
    }
}

module.exports = sqlMap;