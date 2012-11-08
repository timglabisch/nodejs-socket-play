class main
  run: ->
    @webserver = new websocket 72

    @rabbit = new rabbit 5678
    @rabbit.on connection (client ->
        console.log("yea!!!!!");
      ).bind(this)


    @rabbit.listen();
