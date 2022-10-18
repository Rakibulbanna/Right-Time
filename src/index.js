const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require('passport');


const todoHandler = require('./routeHandler/todoHandler')
const questionHandler = require('./routeHandler/questionHandler')
const userHandler = require('./routeHandler/userHandler')

const app = express();
app.use(express.json());
require("dotenv").config();

app.use(cors())

app.use(passport.initialize())
require('./config/passport')(passport)

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oitzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database connection successful!"))
  .catch((error) => console.log(error));

    app.use('/todo',todoHandler);
    app.use('/question',questionHandler);
    app.use('/user',userHandler);

app.get("/", (req, res) => {
  res.send("server is running in 5001 port");
});

app.listen(5001, () => {
  console.log("server is running at 5001 port");
});
