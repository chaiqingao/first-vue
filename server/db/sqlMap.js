var sqlMap = {
    events: {
        getAll: 'select startTime from events order by startTime',
        getNext: 'select * from events where startTime > ? order by startTime limit 1'
    }
}

module.exports = sqlMap;