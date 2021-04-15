const Stream = function() {
  var self = this;

  // object literal of connections; IP addresses as the key
  self.connections = {};

  self.enable = function() {
    return function(req, res, next) {
      res.sseSetup = function() {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        })
      }

      res.sseSend = function(id, event, data) {

        var send = {}
        send["id"] = String(id);
        send["event"] = String(event);
        send["data"] = data;

        var stream = JSON.stringify(send);

        console.log(stream);

        /*var stream = "{ id: " + String(id) + "\n" +
        "event: " + String(event) + "\n" +
        "data: " + JSON.stringify(data) + "}" +
        "\n\n";*/
        
        console.log(id, event, data, stream);

        res.write(stream);
      }

      next()
    }
  }

  self.add = function(request, response) {
    response.sseSetup();
    var cnpj = String(request.params.cnpj);
    self.connections[cnpj] = response;
  }.bind(self);

  self.push_sse = function(id, type, obj) {
    Object.keys(self.connections).forEach(function(key){
      if (key == id) { 
        self.connections[key].sseSend(id, type, obj);
      }
    });
  }.bind(self);

}

/*
  Usage:
  ---
  const express = require('express');
  const Stream = require('./express-eventstream');

  const app = express();
  const stream = new Stream();
  app.use(stream.enable());

  app.get('/stream', function(request, response) {
    stream.add(request, response);
    stream.push_sse(1, "opened", { msg: 'connection opened!' });
  });

  app.get('/test_route', function(request, response){
    stream.push_sse(2, "new_event", { event: true });
    return response.json({ msg: 'admit one' });
  });
*/

module.exports = Stream;