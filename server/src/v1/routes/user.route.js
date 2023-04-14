const { userController } = require('../controllers/index.controller')
const { verifyToken } = require('../middlewares/auth.middleware')
const { Router } = require('express')
const router = Router()

router.get('/', verifyToken, userController.allUser)
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)


module.exports = router
