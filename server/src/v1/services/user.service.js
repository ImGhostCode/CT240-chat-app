const _User = require("../models/_User.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const generateToken = require("../utils/generateToken")

class UserService {
    constructor(authenticationStrategy) {
        this.authenticationStrategy = authenticationStrategy
    }

    async getAllUsers({ keyword, user }) {
        const users = await _User.find(keyword).find({ _id: { $ne: user._id } });
        return { code: 200, status: 'success', message: 'get all users', data: users }
    }

    async editUser({ userId, newInfo }) {

        const updatedUser = await _User.findByIdAndUpdate(
            userId,
            {
                ...newInfo
            },
            {
                new: true,
            }
        )

        if (!updatedUser) {
            throw new ApiError(404, 'failed', "User Not Found", null)
        }

        return new ApiResponse(200, 'success', 'User updated successful', updatedUser)

    }
    async deleteUser({ userId }) {
        const userDeleted = await _User.findByIdAndDelete(userId)
        if (!userDeleted) throw new ApiError(404, 'failed', "UserId Not Found", null)
        return new ApiResponse(200, 'success', 'Delete a user successful', userDeleted)


    }

    async register({ name, email, password, pic }) {
        return this.authenticationStrategy.register({ name, email, password, pic })
    }

    async login({ email, password }) {
        return this.authenticationStrategy.login({ email, password })
    }
}

module.exports = UserService