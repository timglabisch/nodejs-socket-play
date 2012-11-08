class main
  run: ->
    @rabbit = new rabbit 5678

    # plugins
    new plugin_websocket @rabbit, 72
    new plugin_db @rabbit, "some configuration"
    new plugin_log @rabbit

    @rabbit.on 'connection', ((client)->
        console.log("yea!!!!!");
    ).bind(this)

    @rabbit.listen();


(new main).run();