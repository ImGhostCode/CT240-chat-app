const { messageController } = require('../controllers/index.controller')
const { verifyToken } = require('../middlewares/auth.middleware')
const { Router } = require('express')
const router = Router()

router.get('/:conversationId', verifyToken, messageController.allMessages)
router.post('/send-message', verifyToken, messageController.sendMessage)

module.exports = router
