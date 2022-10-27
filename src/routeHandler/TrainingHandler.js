const express = require("express");
const Assessment = require("../schemas/Training/Assessment");
const Customized = require("../schemas/Training/Customized");
const Management = require("../schemas/Training/Management");
const SecurityTraining = require("../schemas/Training/SecurityTraining");
const Training = require("../schemas/Training/Training");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const data = await Training.find({})
 
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
})

router.post("/add", async (req, res) => {
  const NewTraining = new Training(req.body);
  try {
    const data = await NewTraining.save();
    res.status(200).send("inserted successfully");
  } catch (err) {
    res.status(500).send({
      message: "server side error!",
    });
  }
});
router.post("/addAssessment", async (req, res) => {
  const NewTraining = new Assessment(req.body);
  try {
    const data = await NewTraining.save();
    res.status(200).send("inserted successfully");
  } catch (err) {
    res.status(500).send({
      message: "server side error!",
    });
  }
});
router.post("/addCustomized", async (req, res) => {
  const NewTraining = new Customized(req.body);
  try {
    const data = await NewTraining.save();
    res.status(200).send("inserted successfully");
  } catch (err) {
    res.status(500).send({
      message: "server side error!",
    });
  }
});
router.post("/addManagement", async (req, res) => {
  const NewTraining = new Management(req.body);
  try {
    const data = await NewTraining.save();
    res.status(200).send("inserted successfully");
  } catch (err) {
    res.status(500).send({
      message: "server side error!",
    });
  }
});
router.post("/addSecurityTraining", async (req, res) => {
  const NewTraining = new SecurityTraining(req.body);
  try {
    const data = await NewTraining.save();
    res.status(200).send("inserted successfully");
  } catch (err) {
    res.status(500).send({
      message: "server side error!",
    });
  }
});



module.exports = router;
