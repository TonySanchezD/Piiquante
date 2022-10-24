const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer_config')

const sauceCtrl = require('../controllers/sauce')


router.get('/', auth, sauceCtrl.getAllSauce)

//router.get('/:id', auth, )

router.post('/', auth, multer, sauceCtrl.createSauce )

/*router.put('/:id', auth, )

router.delete('/:id', auth, )

router.post('/:id/like', auth, )

exports.module = router*/

module.exports = router