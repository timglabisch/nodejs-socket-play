class rabbit
  constructor:(@port, @websocket) ->

  listen: ->
    console.log "rabbit_listen"
    @connection = require('net').createServer();
    @connection.listen @port, (-> )
    @connection.on 'connection', @onConnect.bind(this)

  onData:(data)->
    console.log 'got data! ' + data;
    @websocket.sendToAll data;

  onConnect:(@client) ->
    @client.on 'data', @onData.bind(this)
    console.log('connected!');

  onDisconnect: ->

  write:(v) ->
    @connection.write(v);