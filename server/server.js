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

        const io = require("socket.io")(server, {
            pingTimeout: 60000,
            cors: {
                // origin: "http://localhost:3052/",
                credentials: true,
            },
        });

        io.on('connection', socket => {
            socket.on('setup', userData => {
                socket.join(userData._id)
                socket.emit('connected')
            })

            socket.on('join chat', room => {
                socket.join(room)
                console.log(`User joined room: ${room}`);

            })

            socket.on('typing', room => {
                socket.in(room).emit('typing')
            })

            socket.on('stop typing', room => {
                socket.in(room).emit('stop typing')
            })

            socket.on('new message', newMessageRecieved => {
                let conversation = newMessageRecieved.conversation
                if (!conversation.users) return console.log('Conversation.users not defined');
                conversation.users.forEach(user => {
                    if (user._id === newMessageRecieved.sender._id) return
                    socket.in(user._id).emit('message recieved', newMessageRecieved)
                });
            })

            socket.off('setup', () => {
                console.log('User disconnected');
                socket.leave(userData._id)
            })

        })
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