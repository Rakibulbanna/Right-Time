const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const passport = require('passport');
const app = express();
const todoHandler = require('./routeHandler/todoHandler')
const questionHandler = require('./routeHandler/questionHandler')
const userHandler = require('./routeHandler/userHandler')
const HomeHandler = require('./routeHandler/HomeHandler');
const TrainingHandler = require('./routeHandler/TrainingHandler');
const PartnerHandle = require('./routeHandler/PartnerHandle');
const AboutHandler = require('./routeHandler/AboutHandler')
const IndustriesHandler = require('./routeHandler/industriesHandler')
const ContactHandler = require('./routeHandler/ContactHandler')
const CareerHandler = require('./routeHandler/CareerHandler')

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
    app.use('/industries',IndustriesHandler);
    app.use('/user',userHandler);
    app.use('/home',HomeHandler);
    app.use('/training',TrainingHandler);
    app.use('/partners',PartnerHandle);
    app.use('/about',AboutHandler)
    app.use('/career',CareerHandler)
    app.use('/contact',ContactHandler)

  
app.use('/static', express.static(path.join(__dirname, '../uploaded_file')))

app.get("/", (req, res) => {
  res.send("server is running in 5001 port");
});

app.use((err,req,res,next)=>{
  // because err.status is undefined 
   res.status(404).json({
       error : {
           message : err.message
      }
   });
})

app.listen(5001, () => {
  console.log("server is running at 5001 port");
});
