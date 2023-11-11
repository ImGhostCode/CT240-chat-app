const _User = require("../models/_User.model");
const _VerifiCode = require("../models/_VerifyCode.model")
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const generateToken = require("../utils/generateToken")
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");

class UserService {
    constructor(authenticationStrategy) {
        this.authenticationStrategy = authenticationStrategy
    }

    async getAllUsers({ keyword, user }) {
        const users = await _User.find(keyword).find({ _id: { $ne: user._id }, isBanned: false });
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
        const userDeleted = await _User.findByIdAndUpdate(userId, { isBanned: true }, { new: true })
        if (!userDeleted) throw new ApiError(404, 'failed', "UserId Not Found", null)
        return new ApiResponse(200, 'success', 'Delete a user successful', userDeleted)
    }

    async register({ name, email, password, pic }) {
        return this.authenticationStrategy.register({ name, email, password, pic })
    }

    async login({ email, password }) {
        return this.authenticationStrategy.login({ email, password })
    }

    async sendVerifyCode({ email }) {
        const user = await _User.findOne({ email })
        if (!user) throw new ApiError(404, 'failed', "User Not Found", null)
        const verifiCode = await _VerifiCode.find({ email })
        if (verifiCode) {
            await _VerifiCode.deleteMany({
                email: email
            })
        }
        const code = this.random4DigitNumber()
        await _VerifiCode.create({
            email: email,
            code: code
        })
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        const content = `
            <p>Hello, ${user.name}</p>
            <p></p>
            <p>We receive a request to set up a new login password for your Chat App account. Please enter the OTP code below to reset the password.</p>
            <p></p>
            <p style="font-size: 50px; color: red">${code}</p>
            <p></p>
            <p>The OTP code is valid for 5 minutes. Note: Do not share this code with anyone, inluding Chat App employees.</p>
        `;
        const mainOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP code to set up new password or Chat APP account',
            html: content,
        }
        const sendEmail = await transporter.sendMail(mainOptions)
        if (!sendEmail) new ApiResponse(500, 'failed', 'Service error, try again later', null)
        return new ApiResponse(200, 'success', 'Submitted successfully', null)
    }

    async resetPassword({ email, code, newPassword }) {
        const currentDate = new Date();
        const verifyCode = await _VerifiCode.findOne({
            email: email,
            code: code
        })
        if (!verifyCode) return new ApiResponse(400, 'failed', 'Code does not exist', null)
        const createdAt = new Date(verifyCode.createdAt)
        createdAt.setMinutes(createdAt.getMinutes() + 5)
        if (createdAt <= currentDate) return new ApiResponse(400, 'failed', 'The verification code has expired', null)
        const user = await _User.findOne({ email })
        if (!user) return new ApiResponse(400, 'failed', 'User Not Found', null)
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(newPassword, salt);
        await _User.findByIdAndUpdate(user._id, {
            password: password
        })
        await _VerifiCode.deleteMany({
            email: email
        })
        return new ApiResponse(200, 'success', 'Password updated successful', null)
    }

    random4DigitNumber() {
        var randomNumber = Math.floor(Math.random() * 1000000);
        var paddedNumber = randomNumber.toString().padStart(6, '0');
        return paddedNumber;
    }

    async getFriendsList({ user }) {
        const request = await _User.findById(user._id, { password: 0 }).populate("friends", "-password -isAdmin -friends -friendsrequest -isBanned")
        return new ApiResponse(200, 'success', 'Found friends list', request.friends)
    }

    async deleteFriend({ user, friendId }) {
        const userId = user._id.toString()
        await _User.findByIdAndUpdate(
            userId,
            {
                $pull: { friends: friendId }
            })
        await _User.findByIdAndUpdate(
            friendId,
            {
                $pull: { friends: userId }
            })
        return new ApiResponse(200, 'success', 'Deleted friends successfully', null)
    }

    async sendFriendInvitation({ user, friendId }) {
        const userId = user._id.toString()
        if (user.friendsrequest.includes(friendId)) {
            await _User.findByIdAndUpdate(
                userId,
                {
                    $push: { friends: friendId },
                    $pull: { friendsrequest: friendId }
                })
            await _User.findByIdAndUpdate(
                friendId,
                {
                    $push: { friends: userId }
                })
            return new ApiResponse(200, 'success', 'Added friends successfully', null)
        }
        if (userId === friendId) return new ApiResponse(400, 'failed', 'The invitation could not be sent to yourself', null)
        const friend = await _User.findById(friendId).select('-password')
        if (!friend) return new ApiResponse(400, 'failed', 'Friend does not exist', null)
        if (friend.friends.includes(userId)) return new ApiResponse(400, 'failed', 'Made friend', null)
        if (friend.friendsrequest.includes(userId)) return new ApiResponse(400, 'failed', 'Sent a friend request', null)
        await _User.findByIdAndUpdate(
            friendId,
            {
                $push: { friendsrequest: userId }
            }, {
            new: true
        }).select('-password')
        return new ApiResponse(200, 'success', 'Invitation sent successfully', null)
    }

    async getFriendsRequest({ user }) {
        const request = await _User.findById(user._id, { password: 0 }).populate("friendsrequest", "-password -isAdmin -friends -friendsrequest -isBanned")
        return new ApiResponse(200, 'success', 'Found friends request list', request.friendsrequest)
    }

    async confirmFriendRequest({ user, friendId }) {
        const userId = user._id.toString()
        if (user.friend && user.friend.includes(friendId)) return new ApiResponse(400, 'failed', 'Made friend', null)
        await _User.findByIdAndUpdate(
            userId,
            {
                $push: { friends: friendId },
                $pull: { friendsrequest: friendId }
            })
        await _User.findByIdAndUpdate(
            friendId,
            {
                $push: { friends: userId }
            })
        return new ApiResponse(200, 'success', 'Added friend successfully', null)
    }

    async deleteFriendRequest({ user, friendId }) {
        const userId = user._id.toString()
        await _User.findByIdAndUpdate(
            userId,
            {
                $pull: { friendsrequest: friendId }
            },
            {
                new: true
            })
        return new ApiResponse(200, 'success', 'Delete request successfully', null)
    }

    async getUserInfo({ id }) {
        return new ApiResponse(200, 'success', 'Found user successfully', await _User.findById(id).select('-password'))
    }
}

module.exports = UserService