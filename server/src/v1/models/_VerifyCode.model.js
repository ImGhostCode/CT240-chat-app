const { Schema, model } = require("mongoose");

const verifiCodeSchema = new Schema(
    {
        email: { type: "String", unique: true, required: true },
        code: { type: "Number", require: true }
    },
    { timestaps: true }
);

module.exports = model("VerifiCode", verifiCodeSchema);