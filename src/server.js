const express = require("express");
// var path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;

const app = express();
var indexRouter = require("./routes/index");
var todoRouter = require("./routes/todo.route");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://jai:jai123@ds137605.mlab.com:37605/todoapi",
  {
    useNewUrlParser: true
  }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongoose connected successfully");
});

app.use("/", indexRouter);
app.use("/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`Backend is running at port ${PORT}`);
});
