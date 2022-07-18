const { body } = require('express-validator');
const {User} = require('../database/models/index');
const {compareSync} = require('bcryptjs')

const login = [
// Email
body('username').notEmpty().withMessage('El username no puede quedar vacío.').bail().isEmail().withMessage('El formato de username no es válido.').bail().custom(async (value) => {
  let users = await User.findAll()
  users = users.map(u => u.username)
  if(!users.includes(value)){
      throw new Error('El username no esta registrado')
  }
  return true
}),
// Password
body('password').notEmpty().withMessage('La contraseña no puede quedar vacía.').bail().isLength({min : 4}).bail().custom(async (value,{req})=>{
  let {username} = req.body
  let users = await User.findAll()
  let user = users.find(u => u.username === username)

  if(!user){
    throw new Error("Usuario no encontrado")
  }

  if(!compareSync(value,user.password)){
    throw new Error("La contraseña es incorrecta")
  }

  return true

})
]

module.exports = login