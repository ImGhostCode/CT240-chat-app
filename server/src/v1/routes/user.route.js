const { userController } = require('../controllers/index.controller')
const { verifyToken } = require('../middlewares/auth.middleware')
const { Router } = require('express')
const { upload } = require('../middlewares/upload.middleware')
const router = Router()

router.get('/', verifyToken, userController.allUser)
router.delete('/:userId', verifyToken, userController.deleteUser)
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.put('/:userId', verifyToken, upload.single('image'), userController.editUser)


module.exports = router
