const express = require("express");
const Assessment = require("../schemas/Training/Assessment");
const Customized = require("../schemas/Training/Customized");
const Management = require("../schemas/Training/Management");
const Security = require("../schemas/Training/SecurityTraining");
const { AssesmentUpload, CustomizedUpload, ManagementUpload, SecurityUpload } = require("../util/upload");

const router = express.Router();

//DONE get
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

// DONE  get single 
router.get("/assesment/:name", async (req, res) => {
  try {
    const data = await Assessment.findOne({name:req.params.name});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/customized/:name", async (req, res) => {
  try {
    const data = await Customized.findOne({name:req.params.name});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/management/:name", async (req, res) => {
  try {
    const data = await Management.findOne({name:req.params.name});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/security/:name", async (req, res) => {
  try {
    const data = await Security.findOne({name:req.params.name});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

//DONE post

router.post("/addAssessment", AssesmentUpload.single('coverPhoto'), async (req, res) => {
  try {
    const NewAssessment = new Assessment({ ...req.body, coverPhoto: req.file.originalname });
    await NewAssessment.save();
    //console.log(data)
    res.status(200).send("Assessment inserted")
  }
  catch (err) {

    if (err.code === 11000) {
      res.status(500).send("This Assessment is alrady taken!");
    } else {
      //console.log(err)
      res.status(500).send("server side error!");
    }

  }
});
router.post("/addCustomized", CustomizedUpload.single('coverPhoto'), async (req, res) => {

  try {
    const NewCustomized = new Customized({ ...req.body, coverPhoto: req.file.originalname });
    await NewCustomized.save();
    res.status(200).send("Customized inserted");
  }
  catch (err) {
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
router.post("/addManagement", ManagementUpload.single('coverPhoto'), async (req, res) => {
  try {
    const NewManagement = new Management({ ...req.body, coverPhoto: req.file.originalname });
    await NewManagement.save();
    res.status(200).send("Management inserted");
  }
  catch (err) {
    if (err) {
      if (err.code === 11000) {
        res.status(500).send("This Management is alrady taken!");
      } else {
        // console.log(err)
        res.status(500).send("server side error!");
      }
    }
  }
});
router.post("/addSecurity", SecurityUpload.single('coverPhoto'), async (req, res) => {
  try {
    const NewSecurity = new Security({ ...req.body, coverPhoto: req.file.originalname });
    await NewSecurity.save();
    res.status(200).send("Security inserted");
  }
  catch (err) {
    if (err) {
      if (err.code === 11000) {
        res.status(500).send("This Security is alrady taken!");
      } else {
        // console.log(err)
        res.status(500).send("server side error!");
      }
    }
  }
});

// DONE delete

router.delete("/Assessment/:id", async (req, res) => {
  try {
    await Assessment.deleteOne({ _id: req.params.id })
    res.status(200).send("Assessment deleted!")
  }
  catch (err) {
    if (err) {
      res.status(500).json({ message: "Assessment deletion failed!!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Assessment deleted successfully!!" });
    }

  }
});
router.delete("/Customized/:id", async (req, res) => {
  try {
    await Customized.deleteOne({ _id: req.params.id })
    res.status(200).send("Customized deleted!")
  }
  catch (err) {
    if (err) {
      res.status(500).json({ message: "Customized deletion failed!!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Customized deleted successfully!!" });
    }

  }
});
router.delete("/Management/:id", async (req, res) => {
  try {
    await Management.deleteOne({ _id: req.params.id })
    res.status(200).send("Management deleted!")
  }
  catch (err) {
    if (err) {
      res.status(500).json({ message: "Management deletion failed!!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Management deleted successfully!!" });
    }

  }
});
router.delete("/Security/:id", async (req, res) => {
  try {
    await Security.deleteOne({ _id: req.params.id })
    res.status(200).send("Security deleted!")
  }
  catch (err) {
    if (err) {
      res.status(500).json({ message: "Security deletion failed!!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Security deleted successfully!!" });
    }

  }
});

//DONE update

router.put('/Assessment/:id', AssesmentUpload.single('coverPhoto'), async (req, res) => {
  try {
    await Assessment.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body?.name,

          coverPhoto: req?.file?.originalname,
          divTitle: req.body?.divTitle,
          divDescription: req.body?.divDescription

        }

      },
      {
        new: true,
        useFindAndModify: false,
      }
    )
    res.status(200).send({ message: "Assessment updated successfully ! " })
  } catch (err) {
    res.status(200).json({
      message: "server error !",
    });
  }
})
router.put('/Customized/:id', CustomizedUpload.single('coverPhoto'), async (req, res) => {
  try {
    await Customized.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body?.name,

          coverPhoto: req?.file?.originalname,
          divTitle: req.body?.divTitle,
          divDescription: req.body?.divDescription

        }

      },
      {
        new: true,
        useFindAndModify: false,
      }
    )
    res.status(200).send({ message: "Customized updated successfully ! " })

  } catch (err) {
    res.status(200).json({
      message: "server error !",
    });
  }
})
router.put('/Management/:id', ManagementUpload.single('coverPhoto'), async (req, res) => {
  try {
    await Management.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body?.name,

          coverPhoto: req?.file?.originalname,
          divTitle: req.body?.divTitle,
          divDescription: req.body?.divDescription

        }

      },
      {
        new: true,
        useFindAndModify: false,
      }
    )
    res.status(200).send({ message: "Management updated successfully ! " })

  } catch (err) {
    res.status(200).json({
      message: "server error !",
    });
  }
})
router.put('/Security/:id', SecurityUpload.single('coverPhoto'), async (req, res) => {
  try {
    await Security.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body?.name,
          coverPhoto: req?.file?.originalname,
          divTitle: req.body?.divTitle,
          divDescription: req.body?.divDescription

        }

      },
      {
        new: true,
        useFindAndModify: false,
      }
    )
    res.status(200).send({ message: "Security updated successfully ! " })

  } catch (err) {
    res.status(200).json({
      message: "server error !",
    });
  }
})

module.exports = router;
