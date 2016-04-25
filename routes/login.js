/**
 * Created by longlingxiu on 15/3/20.
 */

var mysql = require('mysql');


/**
 *  验证用户
 * @param uname
 * @param upwd
 * @param callback
 */
function validataUser( uname, upwd, callback )
{

    var connection = mysql.createConnection({
        host : '127.0.0.1',
        user : 'root',
        password : '',
        port : '3306',
        database : 'mydb'


    });

    connection.connect();

console.log('fdsfdsf')
    var sql = 'select * from userinfos where loginname=? and passwd=?';
    var params = [ uname, upwd ];

    console.log('username : ', uname );
    console.log('userpassword : ', upwd );

    connection.query( sql, params, function( error, result  ){

        var loginRlt = false;

        console.log('oooo')

        console.log( result );
        if( result.length == 1 ){
            loginRlt = true;
        }


        callback( loginRlt );

    } );


}



module.exports = function ( request, response, next ) {

    console.log(' enter login module');

    var username = request.query.uname ;
    var userpassword  = request.query.upwd ;

    console.log('-----------')

    validataUser(username,userpassword, function ( loginResult ) {

        if( loginResult )
        {
            response.redirect( '/info');
            return;
        }

        response.redirect( '/myerror');

    });



} // end method