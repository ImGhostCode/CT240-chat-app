require('dotenv').config();
const app = require('./src/app')
const config = require("./src/v1/config/index");
const mongoose = require("./src/v1/databases/init.mongodb");


const { port, mongo_uri } = config.app;
let server;
async function startServer() {
    try {
        await mongoose.connect(mongo_uri);
        server = app.listen(port, () => {
            console.log(`Server start with port ${port}`);
        });
    } catch (error) {
        console.log(error.message);
        process.exit(0);
    }
}

process.on("SIGINT", async () => {
    if (server) {
        await server.close(() => console.log(`Exits server express`));
        await mongoose.connection.close();
        process.exit(0);
    }
});

startServer();
