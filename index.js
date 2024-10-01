const express = require('express');
const app = express();
const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

io.on("connection", function (socket) {
    console.log("connected");

    socket.on("send_location", function (data) {

        io.emit("received_location", { id: socket.id, ...data });
    });

    socket.on("disconnect", () => {
        io.emit('user_disconnected', socket.id);
    })
});

app.get('/', function (req, res) {
    res.render('index');
});

const PORT = process.env.PORT || 3000

server.listen(PORT);