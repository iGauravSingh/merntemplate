const { protect,verify } = require('../middleware/authMiddleware')
const express = require('express')
const router = express.Router()


const userController = require('../controllers/userController')
// console.log('in user routes')
router.post('/register',userController.register)
router.post('/login',userController.login)
// get all user
router.get('/all', protect, verify , userController.all)

module.exports = router