const express = require("express");
const AssociationCarosor = require("../schemas/HomePage/AssociationCarosor");
const BannerCarosor = require("../schemas/HomePage/BannerCarosor");
const ClientCarousel = require("../schemas/HomePage/ClientCarousel");
const ClientFeedBack = require("../schemas/HomePage/ClientFeedBack");
const PartnerCarousel = require("../schemas/HomePage/PartnerCarousel");
const ServicesCarosor = require("../schemas/HomePage/ServicesCarosor");

const { upload } = require("../util/upload");
const fs = require('fs')
const path = require('path');

const router = express.Router();


//Banner section

router.get("/banner", async (req, res) => {
  try {
    const data = await BannerCarosor.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/banner/:id", async (req, res) => {
  try {
    const data = await BannerCarosor.findOne({ _id: req.params.id });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

router.post("/banner", upload.single('photoURL'), async (req, res) => {

  try {
    console.log(req.file)
    const newBanner = new BannerCarosor({ ...req.body, photoURL: req.file.originalname });

    const data = await newBanner.save();
    res.status(200).json({
      message: "BannerCarosor inserted successfully", data: data
    });

  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "server side error 2!",
    });
  }
});

router.delete('/banner/:id', async (req, res) => {
  try {
    const data = await BannerCarosor.findOne({ _id: req.params.id })

    const image = await data?.photoURL;

    const filePath = path.join("./uploaded_file", image);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    await BannerCarosor.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: "banner deleted!" })
  } catch (err) {
    res.status(200).json({ message: "server error!!" });
  }
})

router.put('/banner/:id', upload.single('photoURL'), async (req, res) => {
  try {
    const data = await BannerCarosor.findOne({ _id: req.params.id })

    const image = await data?.photoURL;

    const filePath = path.join("./uploaded_file", image);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    await BannerCarosor.updateOne({ _id: req.params.id }, {
      $set: {
        title: req.body?.title,
        subtitle: req.body?.subtitle,
        photoURL: req?.file?.originalname
      }
    },
      {
        useFindAndModify: false,
        new: true,
      });
    res.status(200).send({ message: "banner updated successfully!!" })
  }
  catch (err) {
    res.status(200).json({ message: "server error!" });
  }
})


// Service section

router.post("/service", upload.single('photoURL'), async (req, res) => {
  const NewServices = new ServicesCarosor({ ...req.body, photoURL: req.file.originalname });
  try {
    await NewServices.save();
    res.status(200).json({
      message: "New Services inserted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: "server side error!",
    });
  }
});

router.get('/service', async (req, res) => {
  try {
    const data = await ServicesCarosor.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get('/service/:id', async (req, res) => {
  try {
    const data = await ServicesCarosor.findOne({ _id: req.params.id });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

router.put("/service/:id", upload.single('photoURL'), async (req, res) => {
  const data = await ServicesCarosor.findOne({ _id: req.params.id })

  const image = await data?.photoURL;

  const filePath = path.join("./uploaded_file", image);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  await ServicesCarosor.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body?.title,
        subtitle: req.body?.subtitle,
        photoURL: req?.file?.originalname,
      },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json({ message: "Services Carosor updating error!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Services Carosor updated successfully!" });
    }
  });
});

router.delete("/service/:id", async (req, res) => {

  const data = await ServicesCarosor.findOne({ _id: req.params.id })

  const image = await data?.photoURL;

  const filePath = path.join("./uploaded_file", image);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  await ServicesCarosor.deleteOne({ _id: req.params.id }, {}, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Services Carosor deleteting error!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Services Carosor deleted successfully!" });
    }
  })
})

// Association Carosor 

router.get('/association', async (req, res) => {
  try {
    const data = await AssociationCarosor.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get('/association/:id', async (req, res) => {
  try {
    const data = await AssociationCarosor.findOne({ _id: req.params.id });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

router.post("/association", upload.single('photoURL'), async (req, res) => {

  try {
    const NewAssociation = new AssociationCarosor({ ...req.body, photoURL: req.file.originalname });
    await NewAssociation.save();
    res.status(200).json({
      message: "New Association inserted successfully",
    });
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "server side error!",
    });
  }
});
router.delete('/association/:id', async (req, res) => {
  const data = await AssociationCarosor.findOne({ _id: req.params.id })

  const image = await data?.photoURL;

  const filePath = path.join("./uploaded_file", image);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  await AssociationCarosor.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Association Carosor deleteting error!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "Association Carosor deleted successfully!" });
    }
  })
})
router.put('/association/:id', upload.single('photoURL'), async (req, res) => {
  const data = await AssociationCarosor.findOne({ _id: req.params.id })

  const image = await data?.photoURL;

  const filePath = path.join("./uploaded_file", image);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  await AssociationCarosor.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        photoURL: req?.file?.originalname,
      },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json({ message: "association Carosor updating error!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "association Carosor updated successfully!" });
    }
  });
})
// client feedback

router.get('/clientFeedback', async (req, res) => {
  try {
    const data = await ClientFeedBack.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get('/clientFeedback/:id', async (req, res) => {
  try {
    const data = await ClientFeedBack.findOne({ _id: req.params.id });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.post("/clientFeedback", upload.single('photoURL'), async (req, res) => {
  
  try {
    const NewClientFeedBack = new ClientFeedBack({ ...req.body, photoURL: req.file.originalname });
    await NewClientFeedBack.save();
    res.status(200).json({
      message: "New ClientFeedBack inserted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: "server side error!",
    });
  }
});
router.delete('/clientFeedback/:id', async (req, res) => {
  const data = await ClientFeedBack.findOne({ _id: req.params.id })

  const image = await data?.photoURL;

  const filePath = path.join("./uploaded_file", image);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  await ClientFeedBack.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "ClientFeedBack Carosor deleteting error!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "ClientFeedBack Carosor deleted successfully!" });
    }
  })
})
router.put('/clientFeedback/:id', upload.single('photoURL'), async (req, res) => {
  const data = await ClientFeedBack.findOne({ _id: req.params.id })

  const image = await data?.photoURL;

  const filePath = path.join("./uploaded_file", image);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  await ClientFeedBack.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body?.title,
        description: req.body?.description,
        designation: req.body?.designation,
        photoURL: req.file?.originalname,
      },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json({ message: "ClientFeedBack Carosor updating error!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "ClientFeedBack Carosor updated successfully!" });
    }
  });
})

// ClientCarousel

router.get('/clientCarousel', async (req, res) => {
  try {
    const data = await ClientCarousel.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get('/clientCarousel/:id', async (req, res) => {
  try {
    const data = await ClientCarousel.findOne({ _id: req.params.id });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.post("/clientCarousel", upload.single('photoURL'), async (req, res) => {
  const NewClientCarousel = new ClientCarousel({ ...req.body, photoURL: req.file.originalname });
  try {
    const data = await NewClientCarousel.save();
    res.status(200).json({
      message: "New ClientCarousel inserted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: "server side error!",
    });
  }
});
router.delete('/clientCarousel/:id', async (req, res) => {
  const data = await ClientCarousel.findOne({ _id: req.params.id })

  const image = await data?.photoURL;

  const filePath = path.join("./uploaded_file", image);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  await ClientCarousel.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "ClientCarousel Carosor deleteting error!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "ClientCarousel Carosor deleted successfully!" });
    }
  })
})
router.put('/clientCarousel/:id', upload.single('photoURL'), async (req, res) => {
  const data = await ClientCarousel.findOne({ _id: req.params.id })

  const image = await data?.photoURL;

  const filePath = path.join("./uploaded_file", image);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  await ClientCarousel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        photoURL: req.file?.originalname,
      },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json({ message: "ClientCarousel Carosor updating error!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "ClientCarousel Carosor updated successfully!" });
    }
  });
})
// PartnerCarousel

router.get('/partnerCarousel', async (req, res) => {
  try {
    const data = await PartnerCarousel.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get('/partnerCarousel/:id', async (req, res) => {
  try {
    const data = await PartnerCarousel.findOne({ _id: req.params.id });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.post("/partnerCarousel", upload.single('photoURL'), async (req, res) => {
   try {
  console.log({ ...req.body, photoURL: req.file.originalname })
  const NewPartnerCarousel = new PartnerCarousel({ ...req.body, photoURL: req.file.originalname });
 
    await NewPartnerCarousel.save();
    res.status(200).json({
      message: "New PartnerCarousel inserted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: "server side error!",
    });
  }
});
router.delete('/partnerCarousel/:id', async (req, res) => {
  const data = await PartnerCarousel.findOne({ _id: req.params.id })

  const image = await data?.photoURL;

  const filePath = path.join("./uploaded_file", image);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  await PartnerCarousel.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "PartnerCarousel Carosor deleteting error!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "PartnerCarousel Carosor deleted successfully!" });
    }
  })
})
router.put('/partnerCarousel/:id', upload.single('photoURL'), async (req, res) => {
  const data = await PartnerCarousel.findOne({ _id: req.params.id })

  const image = await data?.photoURL;

  const filePath = path.join("./uploaded_file", image);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  await PartnerCarousel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        photoURL: req.file?.originalname,
      },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json({ message: "PartnerCarousel Carosor updating error!" });
    } else {
      //console.log(data);
      res.status(200).json({ message: "PartnerCarousel Carosor updated successfully!" });
    }
  });
})


module.exports = router;
