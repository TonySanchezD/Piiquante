const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer_config')

const sauceCtrl = require('../controllers/sauce')


router.get('/', auth, sauceCtrl.getAllSauce)

router.get('/:id', auth, sauceCtrl.getSauceById)

router.post('/', auth, multer, sauceCtrl.createSauce )

router.put('/:id', auth, multer, sauceCtrl.editSauce)

router.delete('/:id', auth, sauceCtrl.deleteSauce)

router.post('/:id/like', auth, sauceCtrl.addLikeDislike)


module.exports = router