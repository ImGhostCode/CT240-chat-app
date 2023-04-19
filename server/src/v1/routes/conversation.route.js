const { conversationController } = require('../controllers/index.controller')
const { verifyToken } = require('../middlewares/auth.middleware')

const { Router } = require('express')
const { upload } = require('../middlewares/upload.middleware')
const router = Router()

router.get('/', verifyToken, conversationController.fetchAllConversations)
router.post('/create-group', verifyToken, conversationController.createGroupChat)
router.post('/', verifyToken, conversationController.accessConversation)
router.put('/edit-group', verifyToken, upload.single('image'), conversationController.editGroupChat)
router.put('/add-member', verifyToken, conversationController.addMembersToGroup)
router.put('/remove-member', conversationController.removeMembersFromGroup)

module.exports = router
