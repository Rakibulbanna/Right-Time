const express = require("express");
const Training = require("../schemas/Training/Training");

const router = express.Router();

router.get("/all", (req, res) => {
    try {
        const data = Training.find({});
        res.status(200).send(data);
      } catch (err) {
        res.status(500).send({
          message: "server side error!",
        });
      }
});

router.post("/add", async (req, res) => {
  const NewTraining = new Training(req.body);
  try {
    const data = NewTraining.save();
    res.status(200).send("inserted successfully");
  } catch (err) {
    res.status(500).send({
      message: "server side error!",
    });
  }
});

module.exports = router;
