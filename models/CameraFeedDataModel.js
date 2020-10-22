import { Schema, model } from "mongoose";

let CameraFeedData = new Schema(
  {
    category: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: String,
    },
    actual_result: {
      type: String,
    },
    probability: {
      type: Number,
    },
  },
  { collection: "CameraFeedData" }
);

export default model("camerafeeddata", CameraFeedData);
