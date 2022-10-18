const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const authenticate = require('../config/Authenticate')


const questionSchema = require("../schemas/questionSchema");
const TeamMember = require("../schemas/About/TeamMember");

const question = new mongoose.model("questions", questionSchema);




// all question getting
router.get("/", async (req, res) => {
  try {
    const data = await question.find();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

// question adding
router.post("/insert-question",authenticate, async (req, res) => {
  const newQuestion = new question(req.body);
  try {
    const data = await newQuestion.save();
    res.status(200).json({
      message: "question inserted successfully",
      data: data,
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(500).send("This question is alrady taken!");
    } else {
      res.status(500).send("server side error!");
    }
  }
});

//reply adding
router.post("/addreply", async (req, res) => {
  await question.update(
    { _id: req.body._id },
    {
      $push: {
        Comments: {
          description: req.body.description,
          replyerID: req.body.CommentsID,
        },
      },
    },
    
    (err, data) => {
      if (err) {
        res.status(500).send("reply insertion failed!!");
      } else {
        console.log(data)
        res.status(200).send({"data":data,"message":"reply inserted!!"});
      }
    }
  );
});

// reply deleting
router.delete("/replydelete/", async (req, res) => {

 await question.findOneAndUpdate(
    { _id: req.body.questionId },
    {
      $pull: {
        Comments: {
           _id: req.body.CommentsID 
          }
      }
     },
     {
      useFindAndModify: false,
      new: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json({ message: "reply deletion failed!!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "reply deleted successfully!!" });
    }
  });
  
});

module.exports = router;