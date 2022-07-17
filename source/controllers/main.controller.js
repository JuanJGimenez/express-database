const {index,one} = require('../models/product.model');
module.exports = {
    home: (req,res) => {
        return res.render('index',{
            styles: ['index'],
            products: index()
        })
    },
    cart: (req,res) => {
        return res.render('cart',{
            styles: ['cart']
        })
    },
    add: (req,res) => {
        
        let product = one(req.body.id)
        if(req.session.cart.find(item => item.id == product.id)){
            
            req.session.cart = req.session.cart.map(item => {
                if(item.id == product.id){
                    item.quantity = item.quantity + 1
                }
                return item
            })
        }else{
            req.session.cart.push({...product,quantity:1})
        }
        return res.redirect('/cart')
    },
     set: (req,res) => {
        if(req.body.quantity <= 0){
            req.session.cart = req.session.cart.filter(item => item.id != req.body.id)
        }else{
            req.session.cart = req.session.cart.map(item => {
                if(item.id == req.body.id){
                    item.quantity = req.body.quantity
                }
                return item
            })
        }
        return res.redirect('/cart')
    }, 
    remove: (req,res) =>{
        req.session.cart = req.session.cart.filter(item => item.id != req.body.id)
        return res.redirect('/cart')
    }
}