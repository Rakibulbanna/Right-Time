const express = require('express');
const Auditing = require('../schemas/Services/Auditing');
const Certification = require('../schemas/Services/Certification');
const Consultation = require('../schemas/Services/Consultation');
const SecurityTesting = require('../schemas/Services/SecurityTesting');
const router = express.Router();

//DONE get
  router.get("/allAuditing", async (req, res) => {
    try {
      const data = await Auditing.find({});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  router.get("/allCertification", async (req, res) => {
    try {
      const data = await Certification.find({});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  router.get("/allConsultation", async (req, res) => {
    try {
      const data = await Consultation.find({});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  router.get("/allSecurityTesting", async (req, res) => {
    try {
      const data = await SecurityTesting.find({});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  
  // DONE  get single 
  router.get("/auditing", async (req, res) => {
    try {
      const data = await Auditing.findOne({name:req.body.name});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  router.get("/certification", async (req, res) => {
    try {
      const data = await Certification.findOne({name:req.body.name});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  router.get("/consultation", async (req, res) => {
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
  
  router.post("/addAuditing", AssesmentUpload.single('coverPhoto'), async (req, res) => {
    try {
      const NewAuditing = new Auditing({ ...req.body, coverPhoto: req.file.originalname });
      await NewAuditing.save();
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
  router.post("/addCertification", CustomizedUpload.single('coverPhoto'), async (req, res) => {
  
    try {
      const NewCertification = new Certification({ ...req.body, coverPhoto: req.file.originalname });
      await NewCertification.save();
      res.status(200).send("Certification inserted");
    }
    catch (err) {
      if (err) {
        if (err.code === 11000) {
          res.status(500).send("This Certification is alrady taken!");
        } else {
          console.log(err)
          res.status(500).send("server side error!");
        }
      }
    }
  });
  router.post("/addConsultation", ManagementUpload.single('coverPhoto'), async (req, res) => {
    try {
      const NewConsultation = new Consultation({ ...req.body, coverPhoto: req.file.originalname });
      await NewConsultation.save();
      res.status(200).send("Management inserted");
    }
    catch (err) {
      if (err) {
        if (err.code === 11000) {
          res.status(500).send("This Consultation is alrady taken!");
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
  
  router.delete("/auditing/:id", async (req, res) => {
    try {
      await Auditing.deleteOne({ _id: req.params.id })
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
  router.delete("/certification/:id", async (req, res) => {
    try {
      await Certification.deleteOne({ _id: req.params.id })
      res.status(200).send("Certification deleted!")
    }
    catch (err) {
      if (err) {
        res.status(500).json({ message: "Certification deletion failed!!" });
      } else {
        //console.log(data);
        res.status(200).json({ message: "Certification deleted successfully!!" });
      }
  
    }
  });
  router.delete("/consultation/:id", async (req, res) => {
    try {
      await Consultation.deleteOne({ _id: req.params.id })
      res.status(200).send("Consultation deleted!")
    }
    catch (err) {
        res.status(500).json({ message: "Consultation deletion failed!!" });
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
  
  router.put('/auditing/:id', AssesmentUpload.single('coverPhoto'), async (req, res) => {
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
  router.put('/certification/:id', CustomizedUpload.single('coverPhoto'), async (req, res) => {
    try {
      await Certification.findByIdAndUpdate(
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
      res.status(200).send({ message: "Certification updated successfully ! " })
  
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