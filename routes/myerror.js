/**
 * Created by longlingxiu on 15/3/20.
 */


module.exports = function (req,res, next ) {


    res.render('myerror', {title:'登录失败'});
}