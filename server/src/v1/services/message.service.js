const _Message = require("../models/_Message.model");
const _User = require("../models/_User.model");
const _Conversation = require("../models/_Conversation.model");

const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");

class MessageService {
    constructor() { }
    async getAllMessages({ conversationId }) {
        const messages = await _Message.find({ conversation: conversationId })
            .populate("sender", "name pic email")
            .populate("conversation");

        return new ApiResponse(201, 'success', 'Get all message in a conversation', messages)
    }

    async createMessage({ content, conversationId, userId }) {
        let newMessage = {
            sender: userId,
            content,
            conversation: conversationId,
        };
        let message = await _Message.create(newMessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate("conversation");
        message = await _User.populate(message, {
            path: "conversation.users",
            select: "name pic email",
        });
        await _Conversation.findByIdAndUpdate(conversationId, { latestMessage: message });
        return new ApiResponse(201, 'success', 'Send a message successful', message)
    }
}

module.exports = MessageService