class plugin_webserver
  constructor:(@rabbit, @port) ->
    require('http').createServer(@onRequest.bind(this)).listen @port;

  onRequest:(request, response) ->
    for client in @rabbit.clients
      client.write 'hi from web!';

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end "foo";

