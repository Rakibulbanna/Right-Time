const express = require('express');
const Auditing = require('../schemas/Services/Auditing');
const Certification = require('../schemas/Services/Certification');
const Consultation = require('../schemas/Services/Consultation');
const SecurityTesting = require('../schemas/Services/SecurityTesting');
const { upload } = require('../util/upload');
const router = express.Router();

const fs = require('fs')
const path = require('path');
const ManagedServices = require('../schemas/Services/ManagedServices');

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
  router.get("/allManagedServices", async (req, res) => {
    try {
      const data = await ManagedServices.find({});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  
  // DONE  get single by id in body
  router.get("/auditing/:id", async (req, res) => {
    try {
      const data = await Auditing.findOne({_id:req.params.id});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  router.get("/certification/:id", async (req, res) => {
    try {
      const data = await Certification.findOne({_id:req.params.id});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  router.get("/consultation/:id", async (req, res) => {
    try {
      const data = await Consultation.findOne({_id:req.params.id});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  router.get("/securityTesting/:id", async (req, res) => {
    try {
      const data = await SecurityTesting.findOne({_id:req.params.id});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  router.get("/managedServices/:id", async (req, res) => {
    try {
      const data = await ManagedServices.findOne({_id:req.params.id});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
  
  //DONE post
  
  router.post("/addAuditing", upload.single('coverPhoto'), async (req, res) => {
    try {
      const NewAuditing = new Auditing({ ...req.body, coverPhoto: req.file.originalname });
      await NewAuditing.save();
      
      res.status(200).send({ message:"Auditing inserted"})
    }
    catch (err) {
  
      if (err.code === 11000) {
        res.status(500).send({ message:"This Auditing is alrady taken!"});
      } else {
        //console.log(err)
        res.status(500).send({ message:"server side error!"});
      }
  
    }
  });
  router.post("/addCertification", upload.single('coverPhoto'), async (req, res) => {
  
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
  router.post("/addConsultation", upload.single('coverPhoto'), async (req, res) => {
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
  router.post("/addSecurityTesting", upload.single('coverPhoto'), async (req, res) => {
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
  router.post("/addManagedServices", upload.single('coverPhoto'), async (req, res) => {
    try {
      const NewManagedServices = new ManagedServices({ ...req.body, coverPhoto: req.file.originalname });
      await NewManagedServices.save();
      res.status(200).send("SecurityTesting inserted");
    }
    catch (err) {
      if (err) {
        if (err.code === 11000) {
          res.status(500).send("This ManagedServices is alrady taken!");
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
      const data = await Auditing.findOne({ _id: req.params.id })
      
      const image = await data?.coverPhoto;

      const filePath = path.join("./uploaded_file", image);

      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
      }
      await Auditing.deleteOne({ _id: req.params.id })
      res.status(200).send("Auditing deleted!")
    }
    catch (err) {
        res.status(500).json({ message: "Auditing deletion failed!!" });
    }
  });
  router.delete("/certification/:id", async (req, res) => {
    try {
      const data = await Certification.findOne({ _id: req.params.id })
      
      const image = await data?.coverPhoto;

      const filePath = path.join("./uploaded_file", image);

      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
      }
      await Certification.deleteOne({ _id: req.params.id })
      res.status(200).send("Certification deleted!")
    }
    catch (err) {
        res.status(500).json({ message: "Certification deletion failed!!" });
    }
  });
  router.delete("/consultation/:id", async (req, res) => {
    try {
      const data = await Consultation.findOne({ _id: req.params.id })
      
      const image = await data?.coverPhoto;

      const filePath = path.join("./uploaded_file", image);

      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
      }
      await Consultation.deleteOne({ _id: req.params.id })
      res.status(200).send("Consultation deleted!")
    }
    catch (err) {
        res.status(500).json({ message: "Consultation deletion failed!!" });
    }
  });
  router.delete("/securityTesting/:id", async (req, res) => {
    try {
      const data = await SecurityTesting.findOne({ _id: req.params.id })
      
      const image = await data?.coverPhoto;

      const filePath = path.join("./uploaded_file", image);

      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
      }
      await SecurityTesting.deleteOne({ _id: req.params.id })
      res.status(200).send("SecurityTesting deleted!")
    }
    catch (err) {
        res.status(500).json({ message: "SecurityTesting deletion failed!!" });  
    }
  });
  router.delete("/managedServices/:id", async (req, res) => {
    try {
      const data = await ManagedServices.findOne({ _id: req.params.id })
      
      const image = await data?.coverPhoto;

      const filePath = path.join("./uploaded_file", image);

      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
      }
      await ManagedServices.deleteOne({ _id: req.params.id })
      res.status(200).send("ManagedServices deleted!")
    }
    catch (err) {
        res.status(500).json({ message: "ManagedServices deletion failed!!" });  
    }
  });
  
  //DONE update
  
  router.put('/auditing/:id', upload.single('coverPhoto'), async (req, res) => {
    try {
      const data = await Auditing.findOne({ _id: req.params.id })
      
      const image = await data?.coverPhoto;

      const filePath = path.join("./uploaded_file", image);

      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
      }
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
  router.put('/certification/:id', upload.single('coverPhoto'), async (req, res) => {
    try {
      const data = await Certification.findOne({ _id: req.params.id })
      
      const image = await data?.coverPhoto;

      const filePath = path.join("./uploaded_file", image);

      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
      }
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
  router.put('/consultation/:id', upload.single('coverPhoto'), async (req, res) => {
    try {
      const data = await Consultation.findOne({ _id: req.params.id })
      
      const image = await data?.coverPhoto;

      const filePath = path.join("./uploaded_file", image);

      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
      }
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
  router.put('/securityTesting/:id', upload.single('coverPhoto'), async (req, res) => {
    try {
      const data = await SecurityTesting.findOne({ _id: req.params.id })
      
      const image = await data?.coverPhoto;

      const filePath = path.join("./uploaded_file", image);

      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
      }
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
  router.put('/managedServices/:id', upload.single('coverPhoto'), async (req, res) => {
    try {
      const data = await ManagedServices.findOne({ _id: req.params.id })
      
      const image = await data?.coverPhoto;

      const filePath = path.join("./uploaded_file", image);

      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
      }
      await ManagedServices.findByIdAndUpdate(
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
      res.status(200).send({ message: "ManagedServices updated successfully ! " })
  
    } catch (err) {
      res.status(200).json({
        message: "server error !",
      });
    }
  })

module.exports = router;