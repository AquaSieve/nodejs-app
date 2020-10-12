const mqtt = require("mqtt");
const client = mqtt.connect("tcp://localhost:1883");
const clients = require("./WebSocketClient");

client.on("connect", () => {
  // change with your topic 
  // add more subscriptions here with the requirement
  client.subscribe("first_topic");
});

client.on("message", (topic, message) => {
  console.log(`received data from ${topic} \n data : ${message}`);
  var json = JSON.stringify({ type: "message", data: message });
  for (var i = 0; i < clients.length; i++) {
    clients[i].sendUTF(json);
  }
});
