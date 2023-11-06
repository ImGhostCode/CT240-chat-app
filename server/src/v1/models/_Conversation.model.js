const { Schema, model } = require("mongoose");

const conversatonSchema = new Schema(
    {
        conversationName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        imgGroup: { type: String, default: 'group.png' },
        users: [{ type: Schema.Types.ObjectId, ref: "User" }],
        latestMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
        },
        groupAdmin: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

module.exports = model("Conversation", conversatonSchema);