const express = require('express');
const Auditing = require('../schemas/Services/Auditing');
const Certification = require('../schemas/Services/Certification');
const Consultation = require('../schemas/Services/Consultation');
const SecurityTesting = require('../schemas/Services/SecurityTesting');
const { AuditingUpload, CertificationUpload, ConsultationUpload, SecurityTestingUpload } = require('../util/upload');
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
  
  // DONE  get single by name in body
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
      const data = await Consultation.findOne({name:req.body.name});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  router.get("/securityTesting", async (req, res) => {
    try {
      const data = await SecurityTesting.findOne({name:req.body.name});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  
  //DONE post
  
  router.post("/addAuditing", AuditingUpload.single('coverPhoto'), async (req, res) => {
    try {
      const NewAuditing = new Auditing({ ...req.body, coverPhoto: req.file.originalname });
      await NewAuditing.save();
      //console.log(data)
      res.status(200).send("Auditing inserted")
    }
    catch (err) {
  
      if (err.code === 11000) {
        res.status(500).send("This Auditing is alrady taken!");
      } else {
        //console.log(err)
        res.status(500).send("server side error!");
      }
  
    }
  });
  router.post("/addCertification", CertificationUpload.single('coverPhoto'), async (req, res) => {
  
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
  router.post("/addConsultation", ConsultationUpload.single('coverPhoto'), async (req, res) => {
    try {
      const NewConsultation = new Consultation({ ...req.body, coverPhoto: req.file.originalname });
      await NewConsultation.save();
      res.status(200).send("Consultation inserted");
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
  router.post("/addSecurityTesting", SecurityTestingUpload.single('coverPhoto'), async (req, res) => {
    try {
      const NewSecurityTesting = new SecurityTesting({ ...req.body, coverPhoto: req.file.originalname });
      await NewSecurityTesting.save();
      res.status(200).send("SecurityTesting inserted");
    }
    catch (err) {
      if (err) {
        if (err.code === 11000) {
          res.status(500).send("This SecurityTesting is alrady taken!");
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
      res.status(200).send("Auditing deleted!")
    }
    catch (err) {
      if (err) {
        res.status(500).json({ message: "Auditing deletion failed!!" });
      } else {
        //console.log(data);
        res.status(200).json({ message: "Auditing deleted successfully!!" });
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
  router.delete("/securityTesting/:id", async (req, res) => {
    try {
      await SecurityTesting.deleteOne({ _id: req.params.id })
      res.status(200).send("SecurityTesting deleted!")
    }
    catch (err) {
        res.status(500).json({ message: "SecurityTesting deletion failed!!" });  
    }
  });
  
  //DONE update
  
  router.put('/auditing/:id', AuditingUpload.single('coverPhoto'), async (req, res) => {
    try {
      await Auditing.findByIdAndUpdate(
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
      res.status(200).send({ message: "Auditing updated successfully ! " })
    } catch (err) {
      res.status(200).json({
        message: "server error !",
      });
    }
  })
  router.put('/certification/:id', CertificationUpload.single('coverPhoto'), async (req, res) => {
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
  router.put('/consultation/:id', ConsultationUpload.single('coverPhoto'), async (req, res) => {
    try {
      await Consultation.findByIdAndUpdate(
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
      res.status(200).send({ message: "Consultation updated successfully ! " })
  
    } catch (err) {
      res.status(200).json({
        message: "server error !",
      });
    }
  })
  router.put('/securityTesting/:id', SecurityTestingUpload.single('coverPhoto'), async (req, res) => {
    try {
      await SecurityTesting.findByIdAndUpdate(
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
      res.status(200).send({ message: "SecurityTesting updated successfully ! " })
  
    } catch (err) {
      res.status(200).json({
        message: "server error !",
      });
    }
  })


module.exports = router;