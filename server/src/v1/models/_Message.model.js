const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
    {
        sender: { type: Schema.Types.ObjectId, ref: "User" },
        content: { type: String, trim: true },
        conversation: { type: Schema.Types.ObjectId, ref: "Conversation" },
        readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
        isImage: { type: Boolean, default: false, require: true }
    },
    { timestamps: true }
);

module.exports = model("Message", messageSchema);