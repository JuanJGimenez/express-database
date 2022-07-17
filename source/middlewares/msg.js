module.exports = (req,res,next) => {

    let msg = null;

    if(req.query && req.query.msg){
        msg = req.query.msg
    } 

    res.locals.msg = msg

    return next()
}