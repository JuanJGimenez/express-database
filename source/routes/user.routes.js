const { Router } = require('express');
const multer = require('multer');
const router = Router();
const { register, login, process, access,logout } = require ('../controllers/user.controller');
const isLogged = require('../middlewares/isLogged')
const storage = require('../modules/storage')
const upload = multer({storage:storage('../../uploads/users')})
const validationRegister = require('../validations/register')
const validationLogin = require('../validations/login')
router.get('/register', register);
router.get('/login', login);
router.get('/logout',[isLogged],logout)

router.post('/register',[upload.any(),validationRegister], process )
router.post('/access',[validationLogin],access)

module.exports = router;