const {index,one,create,write} = require('../models/product.model');
module.exports ={
  index: (req,res) =>{

    let products = index();

    if(req.query && req.query.name){
      products = products.filter(product => product.name.toLowerCase().indexOf(req.query.name.toLowerCase()) > -1)
    }
    return res.render('products/list',{
      title: 'List of products',
      styles: ['products/list'],
      products: products
    })
  },
  detail: (req, res) => {
    let product = one(parseInt(req.params.id))

    if(!product){
      return res.redirect('/products/')
    }
    return res.render('products/detail', {
      title: 'Detail of products',
      styles: ['products/detail'],
      product:product 
    })
  },
  create: (req,res) => {
    return res.render('products/create', {
      styles: ['products/create'],
      title: 'Create Product',
    })
  },
  save: (req, res) => {
    req.body.image = req.files[0].filename
    let newProduct = create(req.body)
    let products = index();
    products.push(newProduct)
    write(products)
    return res.redirect('/products/')
  },
  edit:(req,res) => {
    let product = one(parseInt(req.params.id))
    if(!product){
      return res.redirect('/products/')
    }
    return res.render('products/edit', {
      title: 'Edit of products',
      product:product 
    })
  },
  modify: (req, res) => {
    let product = one(parseInt(req.params.id))
    let products = index();
    let productsModified = products.map(p =>{ 
      if(p.id == product.id){
        p.name =  req.body.name
        p.description = req.body.description
        p.price = parseInt(req.body.price)
        p.image = req.files && req.files.length > 0 ? req.files[0].filename : p.image
      }
      return p 
    });
    write(productsModified)
    return res.redirect('/products/detail/' + product.id)
  },
  destroid:(req,res) => {
    let product = one(parseInt(req.body.product))
    if(!product){
      return res.redirect('/products/');
    }
    let products = index();
    let productsDeleted = products.filter(p => p.id !== product.id)
    write(productsDeleted)
    return res.redirect('/products/');
  }
}