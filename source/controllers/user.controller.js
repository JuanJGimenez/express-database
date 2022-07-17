const {validationResult} = require('express-validator')
const {index,create,write} = require('../models/user.model');
const usersController = {

  register: function(req, res){
    return res.render('users/register',{
      styles:['users/register'],
    });
  },
  process: function(req, res){
    let validaciones = validationResult(req)
    let {errors} = validaciones
    if(errors && errors.length > 0){
      return res.render('users/register',{
        styles:['users/register'],
        oldData: req.body,
        errors: validaciones.mapped()
      });
    }

    req.body.avatar = req.files[0].filename;
    let newUser = create(req.body)
    let users = index();
    users.push(newUser)
    write(users)
    return res.redirect(`/users/login`)
  },

  login: function(req,res){
    return res.render('users/login',{
      styles:['users/login'],
    });
  },
  access: function(req,res){
    let validaciones = validationResult(req)
    let {errors} = validaciones
    if(errors && errors.length > 0){
      return res.render('users/login',{
        styles:['users/login'],
        oldData: req.body,
        errors: validaciones.mapped()
      });
    }

    let users = index();
    let user = users.find(u => u.username === req.body.username)
    req.session.user = user
    return res.redirect(`/?msg=Bienvenido! ${user.isAdmin? 'Administador':user.username.split('@')[0]}`)
  },
  logout: function (req,res) {
    delete req.session.user 
    return res.redirect('/')
  }
}
  module.exports = usersController;