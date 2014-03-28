var io = require("socket.io-client");

exports.listen = function(config, callback) {
  var socket = io.connect(config.kiwi.socketUrl);

  handleServerConnection(socket, config);
  handleDataReceived(socket, callback);
}

function handleServerConnection(socket, config) {
  socket.on('connect', function() {
    socket.emit('listen', {
      device_id: config.kiwi.deviceId,
      password: config.kiwi.password
    });
  });
}

function handleDataReceived(socket, callback) {
  socket.on('listen_response', function(data) {
    callback(JSON.parse(data.message));
  });
}
