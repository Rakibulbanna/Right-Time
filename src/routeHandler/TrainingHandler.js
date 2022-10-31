const express = require("express");
const Assessment = require("../schemas/Training/Assessment");
const Customized = require("../schemas/Training/Customized");
const Management = require("../schemas/Training/Management");
const Security = require("../schemas/Training/SecurityTraining");
const Training = require("../schemas/Training/Training");

const router = express.Router();

//DONE get

router.get("/allTrainning", async (req, res) => {
  try {
    const data = await Training.find({}); 
    //  const data = await Training.find({}).populate('Assessment')
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/allAssesment", async (req, res) => {
  try {
    const data = await Assessment.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/allCustomized", async (req, res) => {
  try {
    const data = await Customized.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/allManagement", async (req, res) => {
  try {
    const data = await Management.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/allSecurity", async (req, res) => {
  try {
    const data = await Security.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

//DONE post

router.post("/addAssessment", async (req, res) => {
  const NewAssessment = new Assessment(req.body);
  try {
    const data = await NewAssessment.save();
    //console.log(data);
    const data2 = await Training.countDocuments({});
  if (data2) {
      const p_data = await Training.find({}).select('_id');
      const p_id = p_data[0]._id.toString();
        await Training.updateOne(
        { _id: p_id},
        {
          $push: {
            Assessment: [
              data._id
            ]
          },
        });
        res.send("inserted Assessment!")
      }
  else{
        const seed = new Training({
      Assessment: [
        data._id
      ]
    });
    await seed.save()
    res.send("Customized inserted with main parents")
    }
    
  } 
  catch(err) {
      if (err) {
        if (err.code === 11000) {
          res.status(500).send("This Assessment is alrady taken!");
        } else {
           console.log(err)
          res.status(500).send("server side error!");
        }
      }
  }
});
router.post("/addCustomized", async (req, res) => {
  const NewCustomized = new Customized(req.body);
  try {
    const data = await NewCustomized.save();
    //console.log(data);
    const data2 = await Training.countDocuments({});
  if (data2) {
      const p_data = await Training.find({}).select('_id');
      const p_id = p_data[0]._id.toString();
        await Training.updateOne(
        { _id: p_id},
        {
          $push: {
            Customized: [
              data._id
            ]
          },
        });
        res.send("inserted Customized!")
      }
  else{
        const seed = new Training({
        Customized: [
        data._id
      ]
    });
    await seed.save()
    res.send("Customized inserted with main parents")
    }
    
  } 
  catch(err) {
      if (err) {
        if (err.code === 11000) {
          res.status(500).send("This Customized is alrady taken!");
        } else {
           console.log(err)
          res.status(500).send("server side error!");
        }
      }
  }
});
router.post("/addManagement", async (req, res) => {
  const NewManagement = new Management(req.body);
  try {
    const data = await NewManagement.save();
    //console.log(data);
    const data2 = await Training.countDocuments({});
  if (data2) {
      const p_data = await Training.find({}).select('_id');
      const p_id = p_data[0]._id.toString();
        await Training.updateOne(
        { _id: p_id},
        {
          $push: {
            Management: [
              data._id
            ]
          },
        });
        res.send("inserted Management!")
      }
  else{
        const seed = new Training({
       Management: [
        data._id
      ]
    });
    await seed.save()
    res.send("Management inserted with main parents")
    }
    
  } 
  catch(err) {
      if (err) {
        if (err.code === 11000) {
          res.status(500).send("This Management is alrady taken!");
        } else {
           console.log(err)
          res.status(500).send("server side error!");
        }
      }
  }
});
router.post("/addSecurity", async (req, res) => {
  const NewSecurity = new Security(req.body);
  try {
    const data = await NewSecurity.save();
    //console.log(data);
    const data2 = await Training.countDocuments({});
  if (data2) {
      const p_data = await Training.find({}).select('_id');
      const p_id = p_data[0]._id.toString();
        await Training.updateOne(
        { _id: p_id},
        {
          $push: {
            Security: [
              data._id
            ]
          },
        });
        res.send("inserted Security!")
      }
  else{
        const seed = new Training({
        Security: [
        data._id
      ]
    });
    await seed.save()
    res.send("Security inserted with main parents")
    }
    
  } 
  catch(err) {
      if (err) {
        if (err.code === 11000) {
          res.status(500).send("This Security is alrady taken!");
        } else {
           console.log(err)
          res.status(500).send("server side error!");
        }
      }
  }
});

module.exports = router;
