const { conversationController } = require('../controllers/index.controller')
const { verifyToken } = require('../middlewares/auth.middleware')
const { Router } = require('express')
const router = Router()

router.get('/', verifyToken, conversationController.fetchAllConversations)
router.post('/create-group', verifyToken, conversationController.createGroupChat)
router.post('/', verifyToken, conversationController.accessConversation)
router.put('/rename-group', verifyToken, conversationController.renameGroupChat)
router.put('/add-member', verifyToken, conversationController.addMembersToGroup)
router.put('/remove-member', conversationController.removeMembersFromGroup)

module.exports = router
