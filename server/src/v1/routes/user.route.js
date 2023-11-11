const { userController } = require('../controllers/index.controller')
const { verifyToken } = require('../middlewares/auth.middleware')
const { Router } = require('express')
const { upload } = require('../middlewares/upload.middleware')
const router = Router()

router.get('/', verifyToken, userController.allUser)
router.delete('/:userId', verifyToken, userController.deleteUser)
router.get('/me', verifyToken, userController.getUserInfo)

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)

router.put('/:userId', verifyToken, upload.single('image'), userController.editUser)

router.post('/verify-code', userController.sendVerifyCode)
router.patch('/reset-password', userController.resetPassword)

router.get('/friends-list', verifyToken, userController.getFriendsList)
router.patch('/delete-friend/:friendId', verifyToken, userController.deleteFriend)
router.patch('/send-friend-invitations/:friendId', verifyToken, userController.sendFriendInvitations)
router.get('/friends-request', verifyToken, userController.getFriendsRequest)
router.patch('/confirm-friend-request/:friendId', verifyToken, userController.confirmFriendRequest)
router.patch('/delete-friend-request/:friendId', verifyToken, userController.deleteFriendRequest)

module.exports = router