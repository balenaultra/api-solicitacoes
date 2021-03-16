const app = require('../src/app')
const EventEmitter = require('events')
const emitter = new EventEmitter()

function emit(message) {
    emitter.emit('event', message)
}
  
app.get("/stream", (req, res) => {
  console.log(req.method);

  res.setHeader('Content-Type', 'text/event-stream');

  emitter.on('event', (message) => {
    console.log(message);
    res.write("data:" + message + "\n\n");   
  })

}).listen(8080, () => console.log('API stream rodando na porta 8080'));

//module.exports = { emit }