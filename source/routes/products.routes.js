const {Router} = require('express');
const router = Router();
const { index,detail, create, save,edit,modify, destroid } = require('../controllers/product.controller');
const multer = require('multer');
const storage = require('../modules/storage')
const upload = multer({storage: storage('products')});
router.get('/', index)
router.get('/detail/:id', detail)
router.get('/create', create)
router.post('/save',[upload.any()],save)
router.get('/edit/:id', edit)
router.put('/edit/:id',[upload.any()], modify)
router.delete('/delete',destroid)

module.exports = router