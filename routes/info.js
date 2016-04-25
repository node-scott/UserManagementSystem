var mysql = require('mysql');

/**
 * 从数据库中获取信息
 */
function getDataFromDB(queryCallbak) {

    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        port: '3307',
        database: 'mydb'


    });

    connection.connect();


    console.log('开始查询')

    var querySql = 'select * from userinfos';

    connection.query(querySql, function (err, result, fields) {

        if (err) {
            connection.close();
            return;
        }


        // 将结果值传递过去
        queryCallbak(result);

    });


}


module.exports = function (request, response, next) {

    console.log('进入 info 路由回调');


    // 获取数据库的查询结果
    getDataFromDB(function (result) {


        response.render('info', {
            queryRlt: result
        });

    });


};



