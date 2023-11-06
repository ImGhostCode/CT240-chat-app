const _User = require("../models/_User.model");
const _Conversation = require("../models/_Conversation.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");

class ConversationService {
    async getAccessConversation({ reqUserId, userId }) {
        let isConversation = await _Conversation.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: reqUserId } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate("users", "-password")
            .populate("latestMessage");

        isConversation = await _User.populate(isConversation, {
            path: "latestMessage.sender",
            select: "name pic email",
        })

        if (isConversation.length > 0) {
            return new ApiResponse(200, 'success', 'Full Conversation', isConversation[0])
        } else {
            let conversationData = {
                conversationName: "sender",
                isGroupChat: false,
                users: [reqUserId, userId],
            };
            const createdConversation = await _Conversation.create(conversationData);
            const newConversation = await _Conversation.findOne({ _id: createdConversation._id }).populate(
                "users",
                "-password"
            );
            return new ApiResponse(200, 'success', 'Created conversation', newConversation)
        }
    }

    async fetchConversations({ reqUserId }) {
        let results = await _Conversation.find({ users: { $elemMatch: { $eq: reqUserId } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })

        results = await _User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
        });
        return new ApiResponse(200, 'success', 'All Conversation', results)
    }

    async createGroup({ name, members, reqUser }) {
        const groupChat = await _Conversation.create({
            conversationName: name,
            users: [...members],
            isGroupChat: true,
            groupAdmin: reqUser,
        });

        const fullGroupChat = await _Conversation.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        return new ApiResponse(200, 'success', 'Created Group Chat', fullGroupChat)
    }

    async editGroup({ conversationId, newInfo }) {
        const updatedChat = await _Conversation.findByIdAndUpdate(
            conversationId,
            {
                ...newInfo
            },
            {
                new: true,
            }
        )
        if (!updatedChat) {
            throw new ApiError(404, 'failed', "Group Chat Not Found", null)
        }
        return new ApiResponse(200, 'success', 'Group updated successful', updatedChat)
    }

    async removeMembers({ conversationId, userId }) {
        const removed = await _Conversation.findByIdAndUpdate(
            conversationId,
            {
                $pull: { users: userId },
            },
            {
                new: true,
            }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!removed)
            throw new ApiError(404, 'failed', "Group Chat Not Found", null)

        return new ApiResponse(200, 'success', 'Deleted a member from group chat', removed)

    }

    async addMembers({ conversationId, userId }) {
        const memberExisted = await _Conversation.findOne({
            _id: conversationId,
            users: { $in: [userId] }
        }).exec();
        if (memberExisted) throw new ApiError(400, 'failed', "Member is already exist", null)
        const added = await _Conversation.findByIdAndUpdate(
            conversationId,
            {
                $push: { users: userId },
            },
            {
                new: true,
            }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!added) {
            throw new ApiError(404, 'failed', "Group Chat Not Found", null)
        } else {
            return new ApiResponse(200, 'success', 'Added a member to group chat', added)

        }
    }

    async deleteGroup({ conversationId, userId }) {
        const deleted = await _Conversation.findOneAndDelete(
            {
                _id: conversationId,
                groupAdmin: userId
            }
        )
        if (!deleted) {
            throw new ApiError(404, 'failed', 'Group Chat Not Found', null)
        } else {
            return new ApiResponse(200, 'success', 'Deleted group', deleted)
        }
    }
}

module.exports = ConversationService