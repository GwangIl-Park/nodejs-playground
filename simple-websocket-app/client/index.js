const ws = new WebSocket('ws://192.168.56.114:7071/ws');

ws.onmessage = (websocketMessage) => {
  console.log(websocketMessage)
}

document.body.onmousemove = (event) => {
  const messageBody = {
    x:event.clientX,
    y:event.clientY
  }
  ws.send(JSON.stringify(messageBody));
}