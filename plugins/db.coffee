class plugin_db
  constructor:(@rabbit, @mysqlconfig) ->
    @rabbit.on 'connection', ((rabbit_client) ->
      rabbit_client.on 'data', @onRabbitClientData.bind(this)
    ).bind(this)

  onRabbitClientData: (msg, rabbit_client) ->
    console.log "plugin_db - onRabbitClientData " + msg;