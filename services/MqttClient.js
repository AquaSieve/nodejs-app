const mqtt = require("mqtt");
const client = mqtt.connect("tcp://localhost:1883");
import { notifyUsers } from "./WebSocketClient";

const initiate = () => {
  client.on("connect", () => {
    client.subscribe("first_topic");
    client.subscribe("second_topic");
  });

  client.on("message", (topic, message) => {
    notifyUsers(topic, message);
  });
};

export { initiate };
