const {validationResult} = require('express-validator')
const {User} = require('../database/models/index');
const { hashSync } = require('bcryptjs');
const usersController = {

  register: async (req, res) => {
    return res.render('users/register',{
      styles:['users/register'],
    });
  },
  process: async (req, res) => {
    let validaciones = validationResult(req)
    let {errors} = validaciones
    if(errors && errors.length > 0){
      return res.render('users/register',{
        styles:['users/register'],
        oldData: req.body,
        errors: validaciones.mapped()
      });
    }
    req.body.password = hashSync(req.body.password,10)
    req.body.avatar = req.files[0].filename;
    req.body.isAdmin = String(req.body.username).toLowerCase().includes('@dh')
    await User.create(req.body)
    return res.redirect(`/users/login`)
  },

  login: async (req,res) => {
    return res.render('users/login',{
      styles:['users/login'],
    });
  },
  access: async (req,res) => {
    let validaciones = validationResult(req)
    let {errors} = validaciones
    if(errors && errors.length > 0){
      return res.render('users/login',{
        styles:['users/login'],
        oldData: req.body,
        errors: validaciones.mapped()
      });
    }

    let users = await User.findAll();
    let user = users.find(u => u.username === req.body.username)
    req.session.user = user
    return res.redirect(`/?msg=Bienvenido! ${user.isAdmin? 'Administador':user.username.split('@')[0]}`)
  },
  logout: function (req,res) {
    delete req.session.user 
    delete req.session.cart
    return res.redirect('/')
  }
}
  module.exports = usersController;