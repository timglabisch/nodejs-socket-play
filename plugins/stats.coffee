class plugin_stats
  constructor:(@rabbit) ->

    @rabbitOnConnect = 0
    @clientOnData = 0
    @clientOnEnd = 0
    @clientOnTimeout = 0
    @clientOnDrain = 0
    @clientOnError = 0
    @clientOnClose = 0

    @rabbit.on 'connection', ((rabbit_client) ->
      rabbit_client.on 'data', (-> @clientOnData++ ).bind(this)
      rabbit_client.on 'end', (-> @clientOnEnd++ ).bind(this)
      rabbit_client.on 'timeout', (-> @clientOnTimeout++ ).bind(this)
      rabbit_client.on 'drain', (-> @clientOnDrain++ ).bind(this)
      rabbit_client.on 'error', (-> @clientOnError++ ).bind(this)
      rabbit_client.on 'close', (-> @clientOnClose++ ).bind(this)
      @rabbitOnConnect++;

      rabbit_client.on 'data', @flush.bind(this)
    ).bind(this)

  flush: ->
    console.log
      rabbitOnConnect:  @rabbitOnConnect
      clientOnData: @clientOnData
      clientOnEnd: @clientOnEnd
      clientOnTimeout: @clientOnTimeout
      clientOnDrain: @clientOnDrain
      clientOnError: @clientOnError
      clientOnClose: @clientOnClose