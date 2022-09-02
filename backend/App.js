const express = require("express");
const cors = require("cors");
const { ExpressPeerServer , PeerServer} = require('peer');


const controllers = require("./controllers");


const app = express();



  app.use(express.json({limit: '1000mb'}));
app.use(express.urlencoded({limit: '1000mb'}));

app.use(cors());
app.use(express.json());




//app.post("/login", controllers.login);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server Port  ${PORT}`);
 
});
const http = require('http');
 
const server = http.createServer(app);

const peerServer = ExpressPeerServer(server,{ port: 9000, path: '/myapp' });
server.on("connection", function(id) {
  console.log(id + " has connected to the PeerServer");
  });
  
  server.on("disconnect", function(id) {
  console.log(id + " has disconnected from the PeerServer");
  });
  
  
app.use('/peerjs', peerServer);


module.exports = app;
