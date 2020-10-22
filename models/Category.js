import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

let CategoryModel = new Schema(
  {
    id: {
      type: ObjectId,
    },
    name: {
      type: String,
    },
  },
  { collection: "category" }
);

export default model("category", CategoryModel);
