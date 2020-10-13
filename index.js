console.log("start queseive nodejs app");

console.log("starting websocket client");

const t = require("./service/WebSocketClient");



console.log("websocket started");

console.log("starting mqtt client");

require("./service/MqttClient");

console.log("mqtt client started");
