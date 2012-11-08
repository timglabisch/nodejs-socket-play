require('events');

class rabbit_client extends events.EventEmitter
  constructor: (@socket) ->

    @on 'data',     @onData.bind(this)
    @on 'end',      @onEnd.bind(this)
    @on 'timeout',  @onTimeout.bind(this)
    @on 'drain',    @onDrain.bind(this)
    @on 'error',    @onError.bind(this)
    @on 'close',    @onClose.bind(this)

    @socket.on 'data',    (-> @emit 'data', arguments ).bind(this)
    @socket.on 'end',     (-> @emit 'end', arguments ).bind(this)
    @socket.on 'timeout', (-> @emit 'timeout', arguments ).bind(this)
    @socket.on 'drain',   (-> @emit 'drain', arguments ).bind(this)
    @socket.on 'error',   (-> @emit 'error', arguments ).bind(this)
    @socket.on 'close',   (-> @emit 'close', arguments ).bind(this)

  onData:(data) ->
    console.log('client send ' + data);

  onEnd: ->
  onTimeout: ->
  onDrain: ->
  onError: ->
  onClose: ->

  write:(v) ->
    @socket.write(v);