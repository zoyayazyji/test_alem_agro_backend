const express = require("express");
const users = require("./routes/users");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const Port = 8000;

app.use(cors());
app.use(express.json());
app.use("/users", users);

const run = async () => {
  await mongoose.connect("mongodb://localhost/test_alem_agro", { useNewUrlParser: true });

  console.log("Connected to mongo DB");
  app.listen(Port, () => {
    console.log(`Server started at http://localhost:${Port}`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  })
};

run().catch(console.log);