const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
    {
        name: {
            type: "String",
            required: true
        },
        email: {
            type: "String",
            unique: true, required: true
        },
        password: {
            type: "String",
            required: true
        },
        pic: {
            type: "String",
            required: true,
            default: "anonymous-avatar.jpg",
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        friendsrequest: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        isBanned: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    { timestaps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = model("User", userSchema);