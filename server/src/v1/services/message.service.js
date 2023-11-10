const _Message = require("../models/_Message.model");
const _User = require("../models/_User.model");
const _Conversation = require("../models/_Conversation.model");

const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");

const cloudinary = require("cloudinary").v2;

require("dotenv").config();

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

    async createImageMessage({ files, conversationId, userId }) {
        let message = null
        let messages = []
        for (let i = 0; i < files.length; i++) {
            let newMessage = {
                sender: userId,
                content: files[i].path,
                conversation: conversationId,
                isImage: true
            };
            message = await _Message.create(newMessage);
            message = await message.populate("sender", "name pic");
            message = await message.populate("conversation");
            message = await _User.populate(message, {
                path: "conversation.users",
                select: "name pic email",
            });
            messages.push(message)
        }
        await _Conversation.findByIdAndUpdate(conversationId, { latestMessage: message });
        return new ApiResponse(201, 'success', 'Send a message successful', messages)
    }
}

module.exports = MessageService