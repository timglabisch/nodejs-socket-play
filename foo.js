(function() {
  var db, events, main, rabbit, rabbit_client, websocket, websocket_client,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  events = require('events');

  rabbit = (function(_super) {

    __extends(rabbit, _super);

    function rabbit(port, events) {
      this.port = port;
      this.events = events;
      this.clients = [];
    }

    rabbit.prototype.listen = function() {
      console.log("rabbit_listen");
      this.connection = require('net').createServer();
      this.connection.listen(this.port, (function() {}));
      return this.connection.on('connection', this.addClientBySocket.bind(this));
    };

    rabbit.prototype.addClientBySocket = function(socket) {
      return this.addClient(new rabbit_client(socket));
    };

    rabbit.prototype.addClient = function(client) {
      this.emit('connection', client, this["this"]);
      return this.clients.push(client);
    };

    return rabbit;

  })(events.EventEmitter);

  events = require('events');

  rabbit_client = (function(_super) {

    __extends(rabbit_client, _super);

    function rabbit_client(socket) {
      this.socket = socket;
      this.on('data', this.onData.bind(this));
      this.on('end', this.onEnd.bind(this));
      this.on('timeout', this.onTimeout.bind(this));
      this.on('drain', this.onDrain.bind(this));
      this.on('error', this.onError.bind(this));
      this.on('close', this.onClose.bind(this));
      this.socket.on('data', (function() {
        return this.emit('data', arguments);
      }).bind(this));
      this.socket.on('end', (function() {
        return this.emit('end', arguments);
      }).bind(this));
      this.socket.on('timeout', (function() {
        return this.emit('timeout', arguments);
      }).bind(this));
      this.socket.on('drain', (function() {
        return this.emit('drain', arguments);
      }).bind(this));
      this.socket.on('error', (function() {
        return this.emit('error', arguments);
      }).bind(this));
      this.socket.on('close', (function() {
        return this.emit('close', arguments);
      }).bind(this));
    }

    rabbit_client.prototype.onData = function(data) {
      return console.log('client send ' + data);
    };

    rabbit_client.prototype.onEnd = function() {};

    rabbit_client.prototype.onTimeout = function() {};

    rabbit_client.prototype.onDrain = function() {};

    rabbit_client.prototype.onError = function() {};

    rabbit_client.prototype.onClose = function() {};

    rabbit_client.prototype.write = function(v) {
      return this.socket.write(v);
    };

    return rabbit_client;

  })(events.EventEmitter);

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

  main = (function() {

    function main() {}

    main.prototype.run = function() {
      this.webserver = new websocket(72);
      this.rabbit = new rabbit(5678);
      this.rabbit.on('connection', (function(client) {
        return console.log("yea!!!!!");
      }).bind(this));
      return this.rabbit.listen();
    };

    return main;

  })();

  (new main).run();

}).call(this);
