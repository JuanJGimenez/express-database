const {Router} = require('express');
const router = Router();
const { index,detail, create, save,edit,modify, destroid } = require('../controllers/product.controller');
const multer = require('multer');
const storage = require('../modules/storage')
const upload = multer({storage: storage('../../uploads/illustrations')});
const isLogged = require('../middlewares/isLogged')
const isAdmin = require('../middlewares/isAdmin')
const validation = require('../validations/product')
router.get('/', [isLogged,isAdmin], index)
router.get('/detail/:id',[isLogged,isAdmin], detail)
router.get('/create', [isLogged,isAdmin],create)
router.post('/save',[upload.any(),validation],save)
router.get('/edit/:id',[isLogged,isAdmin], edit)
router.put('/edit/:id',[upload.any()], modify)
router.delete('/delete',destroid)

module.exports = router