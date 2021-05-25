import dotenv from 'dotenv'
import app from '../app'
import debugLib from 'debug'
import http from 'http';
import mongoose from 'mongoose'

import portCheck from './portCheck';

dotenv.config();

mongoose.set('useCreateIndex', true)

const debug = debugLib('url-s:server');


const url = process.env.DB_HOST
const port = normalizePort(process.env.PORT || '3000');


var server = http.createServer(app);

console.log('Connecting to database...')
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  server.listen(process.env.PORT || port, () => {
    console.log('Running on Port:' + port)
  })
}).catch(error => {
  console.log('Connection Error:', error)
})

const db = mongoose.connection

db.once('open', _ => {
  console.log('Database Connected:', url)
})

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

