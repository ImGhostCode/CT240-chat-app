const { messageController } = require('../controllers/index.controller')
const { verifyToken } = require('../middlewares/auth.middleware')
const multerUpload = require('../middlewares/image.middleware')
const { Router } = require('express')
const router = Router()

router.get('/:conversationId', verifyToken, messageController.allMessages)
router.post('/send-message', verifyToken, messageController.sendMessage)
router.post('/send-images', verifyToken, multerUpload, messageController.sendImageMessage)

module.exports = router