// const client = require("./MqttClient");

var history = [];
var clients = [];

process.title = "node-chat";
var webSocketsServerPort = 1337;

const startServer = (callback) => {
  var webSocketServer = require("websocket").server;
  var http = require("http");

  function htmlEntities(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var colors = ["red", "green", "blue", "magenta", "purple", "plum", "orange"];

  colors.sort(function (a, b) {
    return Math.random() > 0.5;
  });

  var server = http.createServer(function (request, response) {});
  server.listen(webSocketsServerPort, function () {
    console.log(
      new Date() + " Server is listening on port " + webSocketsServerPort
    );
    callback();
  });

  var wsServer = new webSocketServer({
    httpServer: server,
  });
  wsServer.on("request", function (request) {
    console.log(new Date() + " Connection from origin " + request.origin + ".");

    var connection = request.accept(null, request.origin);

    var index = clients.push(connection) - 1;
    var userName = false;
    var userColor = false;
    console.log(new Date() + " Connection accepted.");

    if (history.length > 0) {
      connection.sendUTF(JSON.stringify({ type: "history", data: history }));
    }

    connection.on("message", function (message) {
      if (message.type === "utf8") {
        if (userName === false) {
          userName = htmlEntities(message.utf8Data);

          userColor = colors.shift();
          connection.sendUTF(
            JSON.stringify({ type: "color", data: userColor })
          );
          console.log(
            new Date() +
              " User is known as: " +
              userName +
              " with " +
              userColor +
              " color."
          );
        } else {
          console.log(
            new Date() +
              " Received Message from " +
              userName +
              ": " +
              message.utf8Data
          );

          // we want to keep history of all sent messages
          var obj = {
            time: new Date().getTime(),
            text: htmlEntities(message.utf8Data),
            author: userName,
            color: userColor,
          };
          history.push(obj);
          history = history.slice(-100);
          // broadcast message to all connected clients
          var json = JSON.stringify({ type: "message", data: obj });
          for (var i = 0; i < clients.length; i++) {
            clients[i].sendUTF(json);
          }
        }
      }
    });
    // user disconnected
    connection.on("close", function (connection) {
      if (userName !== false && userColor !== false) {
        console.log(
          new Date() + " Peer " + connection.remoteAddress + " disconnected."
        );
        // remove user from the list of connected clients
        clients.splice(index, 1);
        // push back user's color to be reused by another user
        colors.push(userColor);
      }
    });
  });
};

const notifyUsers = (topic, message) => {
  if (topic === "first_topic") {
    console.log("data recived first topic");

    const d = JSON.parse(message);
    var json = JSON.stringify({ type: "message", msg: d });

    console.log(d.lat);
    console.log(d.lan)

    for (var i = 0; i < clients.length; i++) {
      clients[i].sendUTF(json);
    }
  } else if (topic === "second_topic") {
    const d = JSON.parse(message);
    const res = JSON.parse(d.labels)

    console.log(res);
  }
};

export { notifyUsers, startServer };
