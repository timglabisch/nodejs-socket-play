class plugin_log
  constructor:(@rabbit) ->
    @rabbit.on 'connection', ((rabbit_client) ->
      rabbit_client.on 'data', (-> console.log "rabbitOnData", arguments )
      rabbit_client.on 'end', (-> console.log "rabbitOnData", arguments )
      rabbit_client.on 'timeout', (-> console.log "rabbitOnData", arguments )
      rabbit_client.on 'drain', (-> console.log "rabbitOnData", arguments )
      rabbit_client.on 'error', (-> console.log "rabbitOnData", arguments )
      rabbit_client.on 'close', (-> console.log "rabbitOnData", arguments )

      console.log "rabbitConnected", arguments

    ).bind(this)
    console.log "init logger"