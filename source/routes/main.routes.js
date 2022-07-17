const {Router} = require('express');
const router = Router();
const { home,add,set,remove,cart} = require('../controllers/main.controller');
const isLogged = require('../middlewares/isLogged')
router.get('/', home)
router.get('/cart',[isLogged],cart)
router.post('/add',add)
router.post('/set',set)
router.post('/remove',remove)

module.exports = router