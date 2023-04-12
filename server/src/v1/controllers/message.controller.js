const MessageService = require("../services/message.service")
const ApiError = require("../utils/apiError")

module.exports = {

    // @description     Get all messages
    // @route           GET /api/v1/messages/:conversationId
    // @access          Protected
    allMessages: async (req, res, next) => {
        try {
            const messageService = new MessageService()
            const resutl = await messageService.getAllMessages({ conversationId: req.params.conversationId })
            return res.json(resutl)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    //@description     Create new message
    //@route           POST /api/messages/
    //@access          Protected
    sendMessage: async (req, res, next) => {
        try {
            const { content, conversationId } = req.body;
            const { _id: userId } = req.user
            if (!content || !conversationId) {
                throw new ApiError(400, 'failed', 'Invalid data passed into request', null)
            }

            const messageService = new MessageService()
            const resutl = await messageService.createMessage({ content, conversationId, userId })
            return res.json(resutl)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    }


}