const ConversationService = require("../services/conversation.service")
const ApiError = require("../utils/apiError")

module.exports = {

    //@description     Create or fetch One to One Chat
    //@route           POST /api/conversations/
    //@access          Protected
    accessConversation: async (req, res, next) => {
        try {
            const { userId } = req.body;
            const { _id: reqUserId } = req.user
            if (!userId) {
                throw new ApiError(400, 'falied', "UserId param not sent with request", null);
            }
            const conversationService = new ConversationService()
            const resutl = await conversationService.getAccessConversation({ reqUserId, userId })
            return res.json(resutl)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    //@description     Fetch all conversations for a user
    //@route           GET /api/conversations/
    //@access          Protected
    fetchAllConversations: async (req, res, next) => {
        try {
            const { _id: reqUserId } = req.user
            const conversationService = new ConversationService()
            const resutl = await conversationService.fetchConversations({ reqUserId })
            return res.json(resutl)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    //@description     Create New Group Chat
    //@route           POST /api/conversations/creare-group
    //@access          Protected

    createGroupChat: async (req, res, next) => {
        try {

            const { users: members, name } = req.body
            if (!members || !name) {
                throw new ApiError(400, 'falied', "Please Fill all the feilds", null);
            }

            const { _id: reqUser } = req.user
            console.log(members);
            let users = members

            if (users.length < 2) {
                throw new ApiError(400, 'falied', "More than 2 users are required to form a group chat", null);
            }

            users.push(req.user);

            const conversationService = new ConversationService()
            const resutl = await conversationService.createGroup({ name, users, reqUser })
            return res.json(resutl)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    // @desc    Rename Group
    // @route   PUT /api/conversations/rename-group
    // @access  Protected
    renameGroupChat: async (req, res, next) => {
        try {
            const { conversationId, newConversationName } = req.body;
            const conversationService = new ConversationService()
            const resutl = await conversationService.renameGroup({ conversationId, newConversationName })
            return res.json(resutl)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },


    // @desc    Remove user from Group
    // @route   PUT /api/conversations/remove-members
    // @access  Protected
    removeMembersFromGroup: async (req, res, next) => {
        try {
            const { conversationId, userId } = req.body;
            const conversationService = new ConversationService()
            const resutl = await conversationService.removeMembers({ conversationId, userId })
            return res.json(resutl)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    // @desc    Add user to Group / Leave
    // @route   PUT /api/conversations/add-members
    // @access  Protected

    addMembersToGroup: async (req, res, next) => {
        try {
            const { conversationId, userId } = req.body;
            const conversationService = new ConversationService()
            const resutl = await conversationService.addMembers({ conversationId, userId })
            return res.json(resutl)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    }

}