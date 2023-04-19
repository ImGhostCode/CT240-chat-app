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
            return new ApiResponse(201, 'success', 'Registration successful', { ...newUser._doc, token: generateToken(newUser._id), })
        } else {
            throw new Error(400, 'failed', "User not found", null);
        }
    }

    async login({ email, password }) {
        const user = await _User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            return new ApiResponse(200, 'success', 'Login successful', { ...user._doc, token: generateToken(user._id), })
        } else {
            throw new ApiError(401, 'failed', "Invalid Email or Password", null);
        }
    }
}

module.exports = EmailAuthentication;