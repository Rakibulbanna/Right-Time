const express = require("express");
const AssessmentTraining = require("../schemas/Training/AssessmentTraining");
const CustomizedTraining = require("../schemas/Training/CustomizedTraining");
const ManagementTraining = require("../schemas/Training/ManagementTraining");
const SecurityTraining = require("../schemas/Training/SecurityTraining");
const { upload } = require("../util/upload");
const fs = require('fs')
const path = require('path');

const router = express.Router();

//DONE get
router.get("/allAssesment", async (req, res) => {
  try {
    const data = await AssessmentTraining.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/allCustomized", async (req, res) => {
  try {
    const data = await CustomizedTraining.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/allManagement", async (req, res) => {
  try {
    const data = await ManagementTraining.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/allSecurity", async (req, res) => {
  try {
    const data = await SecurityTraining.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

// DONE  get single 
router.get("/assesment/:id", async (req, res) => {
  try {
    const data = await AssessmentTraining.findOne({_id:req.params.id});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/customized/:id", async (req, res) => {
  try {
    const data = await CustomizedTraining.findOne({_id:req.params.id});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/management/:id", async (req, res) => {
  try {
    const data = await ManagementTraining.findOne({_id:req.params.id});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/security/:id", async (req, res) => {
  try {
    const data = await SecurityTraining.findOne({_id:req.params.id});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

//DONE post

router.post("/addAssessment", upload.single('coverPhoto'), async (req, res) => {
  try {
    const NewAssessment = new AssessmentTraining({ ...req.body, coverPhoto: req.file.originalname });
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
router.post("/addCustomized", upload.single('coverPhoto'), async (req, res) => {

  try {
    const NewCustomized = new CustomizedTraining({ ...req.body, coverPhoto: req.file.originalname });
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
router.post("/addManagement", upload.single('coverPhoto'), async (req, res) => {
  try {
    const NewManagement = new ManagementTraining({ ...req.body, coverPhoto: req.file.originalname });
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
router.post("/addSecurity", upload.single('coverPhoto'), async (req, res) => {
  try {
    const NewSecurity = new SecurityTraining({ ...req.body, coverPhoto: req.file.originalname });
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

router.delete("/assessment/:id", async (req, res) => {
  try {
    const data = await AssessmentTraining.findOne({ _id: req.params.id })
      
    if (await data.coverPhoto) {
      const image = await data.coverPhoto;
      const filePath = path.join("./uploaded_file", image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }
    await AssessmentTraining.deleteOne({ _id: req.params.id })
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
router.delete("/customized/:id", async (req, res) => {
  try {
    const data = await CustomizedTraining.findOne({ _id: req.params.id })
      
    if (await data.coverPhoto) {
      const image = await data.coverPhoto;
      const filePath = path.join("./uploaded_file", image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }
    await CustomizedTraining.deleteOne({ _id: req.params.id })
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
router.delete("/management/:id", async (req, res) => {
  try {
    const data = await ManagementTraining.findOne({ _id: req.params.id })
      
    if (await data.coverPhoto) {
      const image = await data.coverPhoto;
      const filePath = path.join("./uploaded_file", image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }
    await ManagementTraining.deleteOne({ _id: req.params.id })
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
router.delete("/security/:id", async (req, res) => {
  try {
    const data = await SecurityTraining.findOne({ _id: req.params.id })
      
    if ( await data.coverPhoto) {
      const image = await data.coverPhoto;
      const filePath = path.join("./uploaded_file", image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }
    await SecurityTraining.deleteOne({ _id: req.params.id })
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

router.put('/assessment/:id', upload.single('coverPhoto'), async (req, res) => {
  try {
    const data = await AssessmentTraining.findOne({ _id: req.params.id })
      
    if (req.file && await data.coverPhoto) {
      const image = await data.coverPhoto;
      const filePath = path.join("./uploaded_file", image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }
    await AssessmentTraining.findByIdAndUpdate(
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
router.put('/customized/:id', upload.single('coverPhoto'), async (req, res) => {
  try {
    const data = await CustomizedTraining.findOne({ _id: req.params.id })
      
    if (req.file && await data.coverPhoto) {
      const image = await data.coverPhoto;
      const filePath = path.join("./uploaded_file", image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }
    await CustomizedTraining.findByIdAndUpdate(
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
router.put('/management/:id', upload.single('coverPhoto'), async (req, res) => {
  try {
    const data = await ManagementTraining.findOne({ _id: req.params.id })
      
    if (req.file && await data.coverPhoto) {
      const image = await data.coverPhoto;
      const filePath = path.join("./uploaded_file", image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }
    await ManagementTraining.findByIdAndUpdate(
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
router.put('/security/:id', upload.single('coverPhoto'), async (req, res) => {
  try {
    const data = await SecurityTraining.findOne({ _id: req.params.id })
      
    if (req.file && await data.coverPhoto) {
      const image = await data.coverPhoto;
      const filePath = path.join("./uploaded_file", image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }
    await SecurityTraining.findByIdAndUpdate(
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
