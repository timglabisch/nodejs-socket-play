class plugin_websocket
  constructor:(@rabbit, @port) ->
    @clients = [];
    @connection = require("socket.io").listen(port);
    @connection.on 'connection', @addClientBySocket.bind(this)
    @rabbit.on 'connection', ((rabbit_client) ->
      rabbit_client.on 'data', @onRabbitClientData.bind(this)
    ).bind(this)

  onRabbitClientData: (data, rabbit_client) ->
    @sendToAll(data);

  addClientBySocket: (socket) ->
    console.log "websocket - new client!"
    @addClient new websocket_client socket

  addClient:(client) ->
    @clients.push(client);

  sendToAll:(msg) ->
    console.log "websocket - sendToAll " + msg;
    @connection.sockets.send(msg);

