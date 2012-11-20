(function() {
  var events, main, plugin_db, plugin_log, plugin_stats, plugin_webserver, plugin_websocket, plugin_websocket_client, program, rabbit, rabbit_client,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  events = require('events');

  rabbit = (function(_super) {

    __extends(rabbit, _super);

    function rabbit(port) {
      this.port = port;
      this.clients = [];
    }

    rabbit.prototype.listen = function() {
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
      this.socket.setEncoding('UTF-8');
      this.socket.on('data', (function() {
        return this.emit('data', arguments[0], this);
      }).bind(this));
      this.socket.on('end', (function() {
        return this.emit('end', this);
      }).bind(this));
      this.socket.on('timeout', (function() {
        return this.emit('timeout', this);
      }).bind(this));
      this.socket.on('drain', (function() {
        return this.emit('drain', this);
      }).bind(this));
      this.socket.on('error', (function() {
        return this.emit('error', this);
      }).bind(this));
      this.socket.on('close', (function() {
        return this.emit('close', this);
      }).bind(this));
    }

    rabbit_client.prototype.write = function(v) {
      return this.socket.write(v);
    };

    return rabbit_client;

  })(events.EventEmitter);

  plugin_db = (function() {

    function plugin_db(rabbit, mysqlconfig) {
      this.rabbit = rabbit;
      this.mysqlconfig = mysqlconfig;
      this.rabbit.on('connection', (function(rabbit_client) {
        return rabbit_client.on('data', this.onRabbitClientData.bind(this));
      }).bind(this));
    }

    plugin_db.prototype.onRabbitClientData = function(msg, rabbit_client) {
      return console.log("plugin_db - onRabbitClientData " + msg);
    };

    return plugin_db;

  })();

  plugin_stats = (function() {

    function plugin_stats(rabbit) {
      this.rabbit = rabbit;
      this.rabbitOnConnect = 0;
      this.clientOnData = 0;
      this.clientOnEnd = 0;
      this.clientOnTimeout = 0;
      this.clientOnDrain = 0;
      this.clientOnError = 0;
      this.clientOnClose = 0;
      this.rabbit.on('connection', (function(rabbit_client) {
        rabbit_client.on('data', (function() {
          return this.clientOnData++;
        }).bind(this));
        rabbit_client.on('end', (function() {
          return this.clientOnEnd++;
        }).bind(this));
        rabbit_client.on('timeout', (function() {
          return this.clientOnTimeout++;
        }).bind(this));
        rabbit_client.on('drain', (function() {
          return this.clientOnDrain++;
        }).bind(this));
        rabbit_client.on('error', (function() {
          return this.clientOnError++;
        }).bind(this));
        rabbit_client.on('close', (function() {
          return this.clientOnClose++;
        }).bind(this));
        this.rabbitOnConnect++;
        return rabbit_client.on('data', this.flush.bind(this));
      }).bind(this));
    }

    plugin_stats.prototype.flush = function() {
      return console.log({
        rabbitOnConnect: this.rabbitOnConnect,
        clientOnData: this.clientOnData,
        clientOnEnd: this.clientOnEnd,
        clientOnTimeout: this.clientOnTimeout,
        clientOnDrain: this.clientOnDrain,
        clientOnError: this.clientOnError,
        clientOnClose: this.clientOnClose
      });
    };

    return plugin_stats;

  })();

  plugin_websocket_client = (function() {

    function plugin_websocket_client(socket) {
      this.socket = socket;
    }

    return plugin_websocket_client;

  })();

  plugin_websocket = (function() {

    function plugin_websocket(rabbit, port) {
      this.rabbit = rabbit;
      this.port = port;
      this.clients = [];
      this.connection = require("socket.io").listen(port);
      this.connection.on('connection', this.addClientBySocket.bind(this));
      this.rabbit.on('connection', (function(rabbit_client) {
        return rabbit_client.on('data', this.onRabbitClientData.bind(this));
      }).bind(this));
    }

    plugin_websocket.prototype.onRabbitClientData = function(data, rabbit_client) {
      return this.sendToAll(data);
    };

    plugin_websocket.prototype.addClientBySocket = function(socket) {
      console.log("websocket - new client!");
      return this.addClient(new websocket_client(socket));
    };

    plugin_websocket.prototype.addClient = function(client) {
      return this.clients.push(client);
    };

    plugin_websocket.prototype.sendToAll = function(msg) {
      console.log("websocket - sendToAll " + msg);
      return this.connection.sockets.send(msg);
    };

    return plugin_websocket;

  })();

  plugin_webserver = (function() {

    function plugin_webserver(rabbit, port) {
      this.rabbit = rabbit;
      this.port = port;
      require('http').createServer(this.onRequest.bind(this)).listen(this.port);
    }

    plugin_webserver.prototype.onRequest = function(request, response) {
      var client, _i, _len, _ref;
      _ref = this.rabbit.clients;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        client = _ref[_i];
        client.write('hi from web!');
      }
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      return response.end("foo");
    };

    return plugin_webserver;

  })();

  plugin_log = (function() {

    function plugin_log(rabbit) {
      this.rabbit = rabbit;
      this.rabbit.on('connection', (function(rabbit_client) {
        rabbit_client.on('data', (function() {
          return console.log("rabbitOnData", arguments);
        }));
        rabbit_client.on('end', (function() {
          return console.log("rabbitOnData", arguments);
        }));
        rabbit_client.on('timeout', (function() {
          return console.log("rabbitOnData", arguments);
        }));
        rabbit_client.on('drain', (function() {
          return console.log("rabbitOnData", arguments);
        }));
        rabbit_client.on('error', (function() {
          return console.log("rabbitOnData", arguments);
        }));
        rabbit_client.on('close', (function() {
          return console.log("rabbitOnData", arguments);
        }));
        return console.log("rabbitConnected", arguments);
      }).bind(this));
      console.log("init logger");
    }

    return plugin_log;

  })();

  main = (function() {

    function main() {}

    main.prototype.run = function(port, cb) {
      var rb;
      rb = new rabbit(port);
      if (typeof cb === "function") {
        cb(rb, port);
      }
      rb.listen();
      return rb;
    };

    return main;

  })();

  program = new main;

  program.run(5678, function(rabbit, port) {
    console.log('started on port ' + 5678);
    new plugin_webserver(rabbit, 8585);
    new plugin_websocket(rabbit, 72);
    return new plugin_db(rabbit, "some configuration");
  });

  program.run(56789, function(rabbit, port) {
    console.log('debug started on port ' + port);
    return new plugin_log(rabbit);
  });

  program.run(456, function(rabbit, port) {
    console.log('stats started on port ' + port);
    return new plugin_stats(rabbit);
  });

}).call(this);
