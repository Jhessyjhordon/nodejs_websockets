const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors);
const server = http.createServer(app);

/* Instanciation du server socket qui va se lancé sur le server express
 avec le parametre cors pour lui dire l'origin de connexion qui est autorisé */
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

const groupMessages = {};

io.on('connection', (socket) => {
    console.log(`User connected : ${socket.id}`);

    socket.on("join_group", (data) => {
        console.log("Group joined :", data);
        socket.join(data);
    });

    // receive a message from the client
    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.group).emit("receive_message", data);
    });


    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(3001, () => {
    console.log("SERVER IS UP !");
});