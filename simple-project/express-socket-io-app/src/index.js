const express = require('express');
const app = express()
const path = require('path')
const {Server} = require('socket.io');
const http = require('http');
const {addUser, getUsersInRoom, getUser, removeUser} = require('./utils/users');
const generateMessage = require('./utils/messages');
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')))

io.on("connection", (socket)=>{
  console.log(`${socket.id} connected`)
  socket.on('join', (options, callback)=>{
    const {error, user} = addUser({id:socket.id, ...options});
    console.log(`${socket.id} joined`);
    if(error) callback(error);

    socket.join(user.room)

    socket.emit('message', generateMessage('Admin', `${user.room}방에 온 것을 환영합니다.`))
    socket.broadcast.to(user.room).emit('message', generateMessage('', `${user.username}님이 입장했습니다`))
    io.to(user.room).emit('roomData', {
      room:user.room,
      users:getUsersInRoom(user.room)
    })
  })
  socket.on('sendMessage', (message, callback)=>{
    const user = getUser(socket.id);

    io.to(user.room).emit('message', generateMessage(user.username, message));
    callback();
  })
  socket.on('disconnect', ()=>{
    console.log('socket disconnected', socket.id)
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username}가 방을 나갔습니다.`));
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
  })

server.listen(5151, ()=>{
  console.log('server start 5151')
})