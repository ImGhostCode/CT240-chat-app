const { Router } = require('express');
const userRouter = require('./user.route')
const messageRouter = require('./message.route')
const conversationRouter = require('./conversation.route')
const router = Router();

router.use('/users', userRouter)
router.use('/conversations', conversationRouter)
router.use('/messages', messageRouter)



module.exports = router;