const jwt = require("jsonwebtoken");
const _User = require("../models/_User.model");
const ApiError = require('../utils/apiError')
const { jwt: { jwt_secret } } = require('../config/index')

const verifyToken = async (req, res, next) => {
    let token
    if (
        req.cookies['accessToken'] ||
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            if (req.cookies['accessToken']) {
                token = req.cookies['accessToken']
            } else
                token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, jwt_secret);
            req.user = await _User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            next(new ApiError(401, 'failed', 'Not authorized, token failed', null))
        }
    }
    if (!token) {
        next(new ApiError(401, 'failed', "Not authorized, no token", null))
    }
};

module.exports = { verifyToken } 