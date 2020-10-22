const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017";

const connectDB = () => {
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

  const connection = mongoose.connection;

  connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
  });
};

export { connectDB };
