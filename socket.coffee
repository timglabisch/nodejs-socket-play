class main
  run: ->
    @rabbit = new rabbit 5678

    # plugins
    new websocket @rabbit, 72

    @rabbit.on 'connection', ((client)->
        console.log("yea!!!!!");
      ).bind(this)


    @rabbit.listen();


(new main).run();