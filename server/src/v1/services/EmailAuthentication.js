// emailAuthentication.js
const _User = require("../models/_User.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const generateToken = require("../utils/generateToken");
const AuthenticationStrategy = require("./AuthenticationStrategy");

class EmailAuthentication extends AuthenticationStrategy {

    async register({ name, email, password, pic }) {
        const userExists = await _User.findOne({ email });
        if (userExists) {
            throw new ApiError(400, 'falied', "User already exists", null);
        }
        const newUser = await _User.create({
            name,
            email,
            password,
            pic,
        });
        if (newUser) {
            const { password, _user } = newUser._doc
            return new ApiResponse(201, 'success', 'Registration successful', { ..._user, token: generateToken(newUser._id), })
        } else {
            throw new Error(400, 'failed', "User not found", null);
        }
    }

    async login({ email, password }) {
        const user = await _User.findOne({ email });
        if (user && user.isBanned) {
            throw new ApiError(401, 'failed', "Your account has been banned", null);
        }
        if (user && (await user.matchPassword(password))) {
            const { password, ..._user } = user._doc
            return new ApiResponse(200, 'success', 'Login successful', { ..._user, token: generateToken(user._id), })
        } else {
            throw new ApiError(401, 'failed', "Invalid Email or Password", null);
        }
    }
}

module.exports = EmailAuthentication;