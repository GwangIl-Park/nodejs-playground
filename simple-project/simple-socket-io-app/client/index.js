const socket = io('ws://192.168.56.114:8080')

socket.on('message', text=>{
  const element = document.createElement('li');
  element.innerHTML = text;
  document.querySelector('ul').appendChild(element)
})

document.querySelector('button').onclick=()=>{
  const text = document.querySelector('input').value;
  socket.emit('message', text)
}