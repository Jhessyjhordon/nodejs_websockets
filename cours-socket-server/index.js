const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

const bodyParser = require('body-parser')

// import routes
const authRoutes = require('./routes/authRoutes')

//Initialisation du serveur
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Activation des routes
app.use('/auth', authRoutes);

const server = http.createServer(app); 
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

let users = []; // maintenant on a l'email à la place des user

// Socket.io
io.on("connection", (socket) => {
    // transmet l'id lors d'une connection
    console.log(`User connected : ${socket.id}`);

    socket.on('new_user', (data) => {
      users.push(data);
      console.log(users);
      io.emit('receive_users', users);
    });

    // Me permet de récupérer les messages du client
    socket.on("send_message", (data) => {
      console.log(data);
      io.emit("receive_message", data)
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
      users = users.filter((user) => user.socketID !== socket.id);
      socket.emit('receive_users', users);
      socket.disconnect();
    });
});

// On lance le serveur
server.listen(3001, () => {
    console.log('SERVER IS RUNNING');
});