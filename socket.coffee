class main
  run:(port, cb) ->
    rb = new rabbit port
    cb?(rb, port);
    rb.listen();
    rb

program = new main

program.run 5678, (rabbit, port) ->
  console.log('started on port '+ 5678);
  new plugin_websocket rabbit, 72
  new plugin_db rabbit, "some configuration"

program.run 56789, (rabbit, port) ->
  console.log('debug started on port '+ port);
  new plugin_log rabbit
