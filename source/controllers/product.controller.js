const {validationResult} = require('express-validator')
const {Product} = require('../database/models/index')
module.exports ={
  index: async (req,res) =>{

    let products = await Product.findAll();

    if(req.query && req.query.name){
      products = products.filter(product => product.name.toLowerCase().indexOf(req.query.name.toLowerCase()) > -1)
    }
    return res.render('products/list',{
      title: 'List of products',
      styles: ['products/list'],
      products: products
    })
  },
  detail: async (req, res) => {
    let product = await Product.findByPk(parseInt(req.params.id))

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
  save: async (req, res) => {
    let validaciones = validationResult(req)
    let {errors} = validaciones
    if(errors && errors.length > 0){
      return res.render('products/create',{
        styles:['products/create'],
        oldData: req.body,
        errors: validaciones.mapped()
      });
    }

    req.body.image = req.files[0].filename
    await Product.create(req.body)
    return res.redirect('/products/')
  },
  edit: async (req,res) => {
    let product = await Product.findByPk(parseInt(req.params.id))
    if(!product){
      return res.redirect('/products/')
    }
    return res.render('products/edit', {
      title: 'Edit of products',
      styles: ['products/edit'],
      product:product 
    })
  },
  modify: async (req, res) => {
    let product = await Product.findByPk(parseInt(req.params.id))
    if(!product){
      return res.redirect('/products/');
    }
    await product.update({
      name: req.body.name,
      description:req.body.description,
      price:parseInt(req.body.price),
      image:req.files && req.files.length > 0 ? req.files[0].filename : p.image,
    });
    return res.redirect('/products/detail/' + product.id)
  },
  destroid: async (req,res) => {
    let product = await Product.findByPk(parseInt(req.body.product))
    if(!product){
      return res.redirect('/products/');
    }
    await product.destroy();
    return res.redirect('/products/');
  }
}