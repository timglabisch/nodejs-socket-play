(function() {
  var db, rabbit, websocket, websocket_client;

  rabbit = (function() {

    function rabbit(port, websocket) {
      this.port = port;
      this.websocket = websocket;
    }

    rabbit.prototype.listen = function() {
      console.log("rabbit_listen");
      this.connection = require('net').createServer();
      this.connection.listen(this.port, (function() {}));
      return this.connection.on('connection', this.onConnect.bind(this));
    };

    rabbit.prototype.onData = function(data) {
      console.log('got data! ' + data);
      return this.websocket.sendToAll(data);
    };

    rabbit.prototype.onConnect = function(client) {
      this.client = client;
      this.client.on('data', this.onData.bind(this));
      return console.log('connected!');
    };

    rabbit.prototype.onDisconnect = function() {};

    rabbit.prototype.write = function(v) {
      return this.connection.write(v);
    };

    return rabbit;

  })();

  db = (function() {

    function db() {}

    db.prototype.sendToAll = function(msg) {
      return console.log('send to db!!!' + msg);
    };

    return db;

  })();

  websocket_client = (function() {

    function websocket_client(socket) {
      this.socket = socket;
    }

    return websocket_client;

  })();

  websocket = (function() {

    function websocket(port) {
      this.port = port;
      this.clients = [];
      this.connection = require("socket.io").listen(port);
      this.connection.on('connection', this.addClientBySocket.bind(this));
    }

    websocket.prototype.addClientBySocket = function(socket) {
      console.log("new client!");
      return this.addClient(new websocket_client(socket));
    };

    websocket.prototype.addClient = function(client) {
      return this.clients.push(client);
    };

    websocket.prototype.sendToAll = function(msg) {
      console.log("websocket - sendToAll " + msg);
      return this.connection.sockets.send(msg);
    };

    return websocket;

  })();

  (new rabbit(5678, new websocket(72))).listen();

}).call(this);
