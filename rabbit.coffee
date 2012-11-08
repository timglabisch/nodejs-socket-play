class rabbit
  constructor:(@port, @websocket) ->

  listen: ->
    console.log "rabbit_listen"
    @connection = net.createServer();
    @connection.listen @port, @onConnect.bind(this)
    @connection.on 'data', @onData.bind(this)

  onData:(data)->
    console.log 'got data! ' + data;
    @websocket.sendToAll data;

  onConnect: ->
    console.log('connected!');

  onDisconnect: ->

  write:(v) ->
    @connection.write(v);