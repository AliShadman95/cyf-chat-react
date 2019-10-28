const express = require("express");
var socketio = require("socket.io");
var http = require("http");
const PORT = process.env.PORT || 3005;
const router = require("./router");
const mongoose = require("mongoose");
var Task = require("./api/models/chatModel"); //created model loading here
var bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const {
  addUser,
  updateUserRoom,
  removeUser,
  getUser,
  getUsersInRoom
} = require("./users.js");

// mongoose instance connection url connection
mongoose.connect("mongodb://localhost/Chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var routes = require("./api/routes/chatRoutes"); //importing routes
routes(app); //register the routes

app.use(router);

let previousUserId = "";

io.on("connection", socket => {
  console.log("We have a new connection");
  console.log("Socked id at the start", socket.id);
  socket.on("join", ({ name, avatar, room }, callback) => {
    const { error, user } = addUser({
      id: previousUserId === "" ? socket.id : previousUserId,
      name,
      avatar,
      room
    });
    console.log("we are insdie join", name, avatar, room);
    if (error) return callback(error);

    // previousUserId = socket.id;

    socket.join(user.room);

    //For everyone
    socket.emit("message", {
      name: "Admin",
      message: `${user.name}, Welcome to room ${user.room}`
    });
    //For all beside the sender client
    socket.broadcast
      .to(user.room)
      .emit("message", { name: "Admin", message: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });

  socket.on("SEND_MESSAGE", (message, callback) => {
    console.log("Socked id inside SEND MESS:", socket.id);
    const user = getUser(socket.id);
    console.log(user);
    io.to(user.room).emit("message", {
      avatar: user.avatar,
      name: user.name,
      message
    });

    callback();
  });
  socket.on("CHANGE_ROOM", ({ room }, callback) => {
    console.log("SOcket id inside change room", socket.id, room);
    const user = updateUserRoom(socket.id, room);
    console.log("user", user);

    socket.leave(user.prevRoom);
    socket.join(user.room);

    //For everyone
    socket.emit("message", {
      name: "Admin",
      message: `${user.name}, Welcome to room ${user.room}`
    });
    //For all beside the sender client
    socket.broadcast.to(user.room).emit("message", {
      name: "Admin",
      message: `${user.name} has joined!`
    });

    socket.broadcast.to(user.prevRoom).emit("message", {
      name: "Admin",
      message: `${user.name} has left.`
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });

  socket.on("disconnect", function() {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        name: "Admin",
        message: `${user.name} has left.`
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

server.listen(PORT, () => {
  console.log("listening on *:3005");
});
