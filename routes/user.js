const express = require('express')
const router = express.Router()


const userCtrl = require('../controllers/user')

router.post('/signup', userCtrl.signup)

router.post('/login', userCtrl.login)


//Aide pour débug
router.get('/users', userCtrl.getAllUsers)


module.exports = router