var express = require('express');
require('dotenv').config()
var http = require('http')
var bodyParser = require('body-parser');
var socketio = require('socket.io');
const WorkOS = require('@workos-inc/node').default;
const workos = new WorkOS(process.env.WORKOS_API_KEY);

var app = express();
var server = http.Server(app);
var socket = socketio(server);
server.listen(8080, () => console.log('listening on Port 8080'));

socket.on('connection', (socket) => {
    console.log('connected');
  
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
});

app.use(bodyParser.json());

app.post('/webhooks', async (req, res) => {
    const webhook = workos.webhooks.constructEvent({
      payload: req.body,
      sigHeader: req.headers['workos-signature'],
      secret: process.env.WORKOS_WEBHOOK_SECRET,
      tolerance: 90000,
    })
    socket.emit('webhook event', {webhook})
    console.log("SUCCESS" + JSON.stringify(webhook))
    
    return res.status(200).json("yay successful webhook")
  })