const mongoose = require("mongoose");

// all executed methods log output to console
mongoose.set("debug", true);

// disable colors in debug mode
mongoose.set("debug", { color: false });

// get mongodb-shell friendly output (ISODate)
mongoose.set("debug", { shell: true });

// disconnect
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected to mongodb...");
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb...");
});

module.exports = mongoose;
