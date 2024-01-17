const EmailAuthentication = require("../services/EmailAuthentication")
const UserService = require("../services/user.service")
const ApiError = require("../utils/apiError")
const ApiRes = require('../utils/apiResponse')
const bcrypt = require("bcryptjs");

module.exports = {
    // @description     Get or Search all users
    // @route           GET /api/v1/user?search=
    // @access          Protected
    allUser: async (req, res, next) => {
        try {
            const userService = new UserService()
            const keyword = req.query.search
                ? {
                    $or: [
                        { name: { $regex: req.query.search, $options: "i" } },
                        { email: { $regex: req.query.search, $options: "i" } },
                    ],
                }
                : {};
            const result = await userService.getAllUsers({ keyword, user: req.user })
            return res.json(result)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }

    },

    //@description     Register new user
    //@route           POST /api/v1/users/register
    //@access          Public
    registerUser: async (req, res, next) => {
        try {
            const emailAuthentication = new EmailAuthentication();
            const userService = new UserService(emailAuthentication);
            const { name, email, password, pic } = req.body;
            if (!name || !email || !password) {
                throw new ApiError(400, 'failed', "Please Enter all the Feilds", null);
            }
            const result = await userService.register({ name, email, password, pic })
            return res.json(result)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }

    },

    //@description     Auth the user
    //@route           POST /api/v1/users/login
    //@access          Public
    loginUser: async (req, res, next) => {
        try {
            const emailAuthentication = new EmailAuthentication();
            const userService = new UserService(emailAuthentication);
            const { email, password } = req.body;
            if (!email || !password) {
                throw new ApiError(400, 'failed', "Please Enter all the Feilds", null);
            }
            const result = await userService.login({ email, password })
            res.cookie('accessToken', result.data.token, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'none',
            })
            delete result.data.token;
            return res.json(result)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }

    },

    //@description     Auth the user
    //@route           POST /api/v1/users/logout
    //@access          Protected
    logoutUser: async (req, res, next) => {
        try {
            await res.clearCookie("accessToken")
            return res.json(new ApiRes(200, 'success', 'Logout successful', null))
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    // @desc    edit user
    // @route   PUT /api/users/:userId
    // @access  Protected
    editUser: async (req, res, next) => {
        try {
            let { newPassword } = req.body;
            const { userId } = req.params
            newPassword = newPassword ? JSON.parse(newPassword) : undefined
            if (!userId) throw new ApiError(400, 'falied', "Please Fill all the fields", null);
            const newInfo = { password: newPassword, pic: req.file?.filename || undefined }
            Object.keys(newInfo).forEach(
                (key) => newInfo[key] === undefined && delete newInfo[key]
            );
            if (newInfo.password) {
                const salt = await bcrypt.genSalt(10);
                newInfo.password = await bcrypt.hash(newInfo.password, salt);
            }
            const userService = new UserService()
            const resutl = await userService.editUser({ userId, newInfo })
            return res.json(resutl)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    //@description     Delete the user
    //@route           DELETE /api/v1/users/:userId
    //@access          Protected
    deleteUser: async (req, res, next) => {
        try {
            const userService = new UserService()
            const { userId } = req.params
            const result = await userService.deleteUser({ userId })
            return res.json(result)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    //@description     Forgot password
    //@route           DELETE /api/v1/users/verify-code
    //@access          Protected
    sendVerifyCode: async (req, res, next) => {
        try {
            const userService = new UserService()
            const { email } = req.body
            const result = await userService.sendVerifyCode({ email })
            return res.json(result)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    //@description     Reset password
    //@route           PATCH /api/v1/users/reset-password
    //@access          Protected
    resetPassword: async (req, res, next) => {
        try {
            const userService = new UserService()
            const { email, code, newPassword } = req.body
            const result = await userService.resetPassword({ email, code, newPassword })
            return res.json(result)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    //@description     Get list friends
    //@route           GET /api/v1/users/friends-list
    //@access          Protected
    getFriendsList: async (req, res, next) => {
        try {
            const userService = new UserService()
            const user = req.user
            const result = await userService.getFriendsList({ user })
            return res.json(result)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    //@description     Delete friend
    //@route           PATCH /api/v1/users/delete-friend/:friendId
    //@access          Protected
    deleteFriend: async (req, res, next) => {
        try {
            const userService = new UserService()
            const user = req.user
            const friendId = req.params.friendId
            const result = await userService.deleteFriend({ user, friendId })
            return res.json(result)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    //@description     Send friend invitation
    //@route           PATCH /api/v1/users/send-friend-invitations/:friendId
    //@access          Protected
    sendFriendInvitations: async (req, res, next) => {
        try {
            const userService = new UserService()
            const user = req.user
            const friendId = req.params.friendId
            const result = await userService.sendFriendInvitation({ user, friendId })
            return res.json(result)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    //@description     Get friends request
    //@route           GET /api/v1/users/friends-request
    //@access          Protected
    getFriendsRequest: async (req, res, next) => {
        try {
            const userService = new UserService()
            const user = req.user
            const result = await userService.getFriendsRequest({ user })
            return res.json(result)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    //@description     Confirm friend request
    //@route           PATCH /api/v1/users/confirm-friend-request/:friendId
    //@access          Protected
    confirmFriendRequest: async (req, res, next) => {
        try {
            const userService = new UserService()
            const user = req.user
            const friendId = req.params.friendId
            const result = await userService.confirmFriendRequest({ user, friendId })
            return res.json(result)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    //@description     Delete friend request
    //@route           PATCH /api/v1/users/delete-friend-request/:friendId
    //@access          Protected
    deleteFriendRequest: async (req, res, next) => {
        try {
            const userService = new UserService()
            const user = req.user
            const friendId = req.params.friendId
            const result = await userService.deleteFriendRequest({ user, friendId })
            return res.json(result)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    },

    //@description     Get user
    //@route           PATCH /api/v1/users/me
    //@access          Protected
    getUserInfo: async (req, res, next) => {
        try {
            const userService = new UserService()
            const user = req.user
            const id = user._id
            const result = await userService.getUserInfo({ id })
            return res.json(result)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }
    }
}
