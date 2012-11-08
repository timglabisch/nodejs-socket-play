events = require('events');

class rabbit_client extends events.EventEmitter
  constructor: (@socket) ->
    @socket.setEncoding 'UTF-8'
    @socket.on 'data',    (-> @emit 'data', arguments[0], this ).bind(this)
    @socket.on 'end',     (-> @emit 'end', this ).bind(this)
    @socket.on 'timeout', (-> @emit 'timeout', this ).bind(this)
    @socket.on 'drain',   (-> @emit 'drain', this ).bind(this)
    @socket.on 'error',   (-> @emit 'error', this ).bind(this)
    @socket.on 'close',   (-> @emit 'close', this ).bind(this)

  write:(v) ->
    @socket.write(v);