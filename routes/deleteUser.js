var mysql = require('mysql');

function deleteDataFromDB(id, callback) {

    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        port: '3306',
        database: 'mydb'


    });

    connection.connect();

    var sql = 'delete from userinfos where id = ' + id;

    console.log(sql);

    connection.query(sql, function (err, result) {
        if (err) {
            connection.close();
            return;
        }

        callback();


    });

}

module.exports = function (request, response, next) {

    var dUserID = request.query.userid;

    console.log("要删除的ID:" + dUserID);

    deleteDataFromDB(dUserID, function () {

        var contentValue = "用户" + dUserID + "已被删除";

        response.render('deleteRlt', {
            content: contentValue
        });

    });


};