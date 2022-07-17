module.exports = (req,res,next) => {

    let cart = [];



    if(req.session && !req.session.cart){
        req.session.cart = cart
    }else{
        cart = req.session.cart
    }

    
    res.locals.cart = cart

    return next()
}