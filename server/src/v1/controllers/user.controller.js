const UserService = require("../services/user.service")
const ApiError = require("../utils/apiError")
const ApiRes = require('../utils/apiResponse')

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
            const resutl = await userService.getAllUsers({ keyword, user: req.user })
            return res.json(resutl)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }

    },

    //@description     Register new user
    //@route           POST /api/v1/users/register
    //@access          Public
    registerUser: async (req, res, next) => {
        try {
            const userService = new UserService()
            const { name, email, password, pic } = req.body;
            console.log(name, email, password);
            if (!name || !email || !password) {
                throw new ApiError(400, 'failed', "Please Enter all the Feilds", null);
            }
            const resutl = await userService.register({ name, email, password, pic })
            return res.json(resutl)
        } catch (error) {
            return res.json({ ...error, message: error.message })
        }

    },


    //@description     Auth the user
    //@route           POST /api/v1/users/login
    //@access          Public
    loginUser: async (req, res, next) => {
        try {
            const userService = new UserService()
            const { email, password } = req.body;
            if (!email || !password) {
                throw new ApiError(400, 'failed', "Please Enter all the Feilds", null);
            }
            const resutl = await userService.login({ email, password })
            res.cookie('accessToken', resutl.data.token, { httpOnly: true, secure: false, path: '/', sameSite: 'strict' })
            return res.json(resutl)
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
    }
}