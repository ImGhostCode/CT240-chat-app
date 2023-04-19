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
            console.log(name, email, password);
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
            res.cookie('accessToken', result.data.token, { httpOnly: true, secure: false, path: '/', sameSite: 'strict' })
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
            console.log(newPassword);
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


}