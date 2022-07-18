const { body } = require('express-validator');
const {extname,resolve} = require('path')
const {unlinkSync} = require('fs')
const {User} = require('../database/models/index');
const register = [
    body('username').notEmpty().withMessage('El username no puede quedar vacío.').bail().isEmail().withMessage('El formato de username no es válido.').bail().custom(async (value) => {
        let users = await User.findAll()
        users = users.map(u => u.username)
        if(users.includes(value)){
            throw new Error('El username ya esta registrado')
        }
        return true
    }),
    body('password').notEmpty().withMessage('La contraseña no puede quedar vacía.').bail().isLength({min : 4}).bail(),
    body('avatar').custom((value,{req}) =>{
        let archivos =req.files
        if(!archivos || archivos.length == 0){
            throw new Error('No se subio ninguna imagen')
        }
        let extensiones = ['.svg','.png','.jpg','.jpeg']
        let avatar = archivos[0]
        let extension = extname(avatar.filename)

        if(!extensiones.includes(extension)){
            unlinkSync(resolve(__dirname, '../../uploads','users',avatar.filename))
            throw new Error('La imagen no tiene una extension valida')
        }

        if(avatar.size > 2097152){
            unlinkSync(resolve(__dirname, '../../uploads','users',avatar.filename))
            throw new Error('La imagen supera el peso de 2MB')
        }

        return true
    })

]

module.exports = register;
