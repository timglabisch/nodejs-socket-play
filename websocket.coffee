class websocket
  constructor:(@port) ->
    @clients = [];
    @connection = require("socket.io").listen(port);
    @connection.on 'connection', @addClientBySocket.bind(this)

  addClientBySocket: (socket) ->
    console.log "new client!"
    @addClient new websocket_client socket

  addClient:(client) ->
    @clients.push(client);

  sendToAll:(msg) ->
    console.log "websocket - sendToAll " + msg;
    @connection.sockets.send(msg);

