const express = require("express");
const { upload } = require("../util/upload");
const fs = require('fs')
const path = require('path');
const SecurityAssessmentSolutions = require("../schemas/Solutions/SecurityAssessmentSolutions");
const CyberSecuritySolutions = require("../schemas/Solutions/CyberSecuritySolutions");

const router = express.Router();
//SecurityAssessmentSolutions
router.get("/security/", async (req, res) => {
    try {
      const data = await SecurityAssessmentSolutions.find({});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  router.get("/security/:id", async (req, res) => {
    try {
      const data = await SecurityAssessmentSolutions.findOne({_id:req.params.id});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  router.post("/security/", upload.single('coverPhoto'), async (req, res) => {
    try {
      const NewSolutions = new SecurityAssessmentSolutions({ ...req.body, coverPhoto: req.file.originalname });
      await NewSolutions.save();
      //console.log(data)
      res.status(200).send("SecurityAssessmentSolutions inserted")
    }
    catch (err) {
  
      if (err.code === 11000) {
        res.status(500).send("This SecurityAssessmentSolutions is alrady taken!");
      } else {
        //console.log(err)
        res.status(500).send("server side error!");
      }
  
    }
  });
  router.delete("/security/:id", async (req, res) => {
    try {
      const data = await SecurityAssessmentSolutions.findOne({ _id: req.params.id })
        
      if (await data.coverPhoto) {
        const image = await data.coverPhoto;
        const filePath = path.join("./uploaded_file", image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      }
      await SecurityAssessmentSolutions.deleteOne({ _id: req.params.id })
      res.status(200).send("SecurityAssessmentSolutions deleted!")
    }
    catch (err) {
      if (err) {
        res.status(500).json({ message: "SecurityAssessmentSolutions deletion failed!!" });
      } else {
        //console.log(data);
        res.status(200).json({ message: "SecurityAssessmentSolutions deleted successfully!!" });
      }
  
    }
  });
  router.put('/security/:id', upload.single('coverPhoto'), async (req, res) => {
    try {
      const data = await SecurityAssessmentSolutions.findOne({ _id: req.params.id })
        
      if (req.file && await data.coverPhoto) {
        const image = await data.coverPhoto;
        const filePath = path.join("./uploaded_file", image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      }
      await SecurityAssessmentSolutions.findByIdAndUpdate(
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
      res.status(200).send({ message: "SecurityAssessmentSolutions updated successfully ! " })
    } catch (err) {
      res.status(200).json({
        message: "server error !",
      });
    }
  })
  // CyberSecuritySolutions

router.get("/cyberSecurity/", async (req, res) => {
    try {
      const data = await CyberSecuritySolutions.find({});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  router.get("/cyberSecurity/:id", async (req, res) => {
    try {
      const data = await CyberSecuritySolutions.findOne({_id:req.params.id});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  router.post("/cyberSecurity/", upload.single('coverPhoto'), async (req, res) => {
    try {
      const NewCyberSecuritySolutions = new CyberSecuritySolutions({ ...req.body, coverPhoto: req.file.originalname });
      await NewCyberSecuritySolutions.save();
      //console.log(data)
      res.status(200).send("CyberSecuritySolutions inserted")
    }
    catch (err) {
  
      if (err.code === 11000) {
        res.status(500).send("This CyberSecuritySolutions is alrady taken!");
      } else {
        //console.log(err)
        res.status(500).send("server side error!");
      }
  
    }
  });
  router.delete("/cyberSecurity/:id", async (req, res) => {
    try {
      const data = await CyberSecuritySolutions.findOne({ _id: req.params.id })
        
      if (await data.coverPhoto) {
        const image = await data.coverPhoto;
        const filePath = path.join("./uploaded_file", image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      }
      await CyberSecuritySolutions.deleteOne({ _id: req.params.id })
      res.status(200).send("CyberSecuritySolutions deleted!")
    }
    catch (err) {
      if (err) {
        res.status(500).json({ message: "CyberSecuritySolutions deletion failed!!" });
      } else {
        //console.log(data);
        res.status(200).json({ message: "CyberSecuritySolutions deleted successfully!!" });
      }
  
    }
  });
  router.put('/cyberSecurity/:id', upload.single('coverPhoto'), async (req, res) => {
    try {
      const data = await CyberSecuritySolutions.findOne({ _id: req.params.id })
        
      if (req.file && await data.coverPhoto) {
        const image = await data.coverPhoto;
        const filePath = path.join("./uploaded_file", image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      }
      await CyberSecuritySolutions.findByIdAndUpdate(
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
      res.status(200).send({ message: "CyberSecuritySolutions updated successfully ! " })
    } catch (err) {
      res.status(200).json({
        message: "server error !",
      });
    }
  })

  module.exports = router;