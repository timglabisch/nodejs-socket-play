events = require('events');

class rabbit extends events.EventEmitter

  constructor:(@port) ->
    @clients = [];

  listen: ->
    @connection = require('net').createServer();
    @connection.listen @port, (-> )
    @connection.on 'connection', @addClientBySocket.bind(this)

  addClientBySocket: (socket) ->
    @addClient new rabbit_client socket

  addClient:(client) ->
    @emit 'connection', client, @this
    @clients.push(client);