const socket = io();

socket.on('message', message => {
  console.log(message);
});

document.querySelector('#message-form').addEventListener('submit', event => {
  event.preventDefault();

  const message = event.target.elements.message.value;

  socket.emit('sendMessage', message, () => {
    console.log('Message was delivered.');
    
  });
});

document.querySelector('#location-btn').addEventListener('click', event => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.')
  }
  
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  });
});
