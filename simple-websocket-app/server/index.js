const WebSocket = require('ws');

const wss = new WebSocket.Server({port:7071});

wss.on("connection", (ws)=>{
  ws.send("connected")

  ws.on("message", (messageFromClient)=>{
    console.log(JSON.parse(messageFromClient))
  })
})