const express = require("express");
const Partners = require("../schemas/Partners/Partners");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Partners.find({})

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
//getting partner


router.get("/service", async (req, res) => {
  try {
    const data = await Partners.find({}).select('ServicePartner');

    res.status(200).json(data[0].ServicePartner);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/solution", async (req, res) => {
  try {
    const data = await Partners.find({}).select('SolutionPartner');

    res.status(200).json(data[0].SolutionPartner);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/association", async (req, res) => {
  try {
    const data = await Partners.find({}).select('Association');

    res.status(200).json(data[0].Association);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
// getting by id

router.get("/service/:id", async (req, res) => {
  try {
    
    const data = await Partners.find({}).select('ServicePartner');
    const id = req.params.id
    const temp = data[0].ServicePartner;
   const serviceData = temp?.find(i=> i._id==id)

    res.status(200).json(serviceData);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/solution/:id", async (req, res) => {
  try {
    const data = await Partners.find({}).select('SolutionPartner');
    const id = req.params.id
    const temp = data[0].SolutionPartner;
   const SolutionPartnerData = temp?.find(i=> i._id==id)
    res.status(200).json(SolutionPartnerData);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});
router.get("/association/:id", async (req, res) => {
  try {
    const data = await Partners.find({}).select('Association');
    const id = req.params.id
    const temp = data[0].Association;
   const AssociationPartnerData = temp?.find(i=> i._id==id)
    res.status(200).json(AssociationPartnerData);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

//partner Insert Section

const firstInsert = async (e) => {
  const newCollection = Partners({
    ServicePartner: [
      {
        name: e?.name || "",
        url: e?.url || "",
      },
    ],
    SolutionPartner: [
      {
        name: e?.name || "",
        url: e?.url || "",
      },
    ],
    Association: [
      {
        name: e?.name || "",
        url: e?.url || "",
      },
    ],
  });

  await newCollection.save((err) => {
    if (err) {
      res.status(500).json({ message: "Table creation failed!!" });
    } else {
      console.log("table inserted successfully");
    }
  });
};

router.post("/addService", async (req, res) => {
  console.log(req.body)
  const dataCount = await Partners.countDocuments({});

  if (dataCount === 1) {
    const dd = await Partners.find({}).select({
      Association: 0,
      SolutionPartner: 0,
      reply: 0,
      __v: 0,
    });
const count = await dd[0].ServicePartner.length;

const flagName =  await dd[0].ServicePartner[0].name;
const flagUrl = await dd[0].ServicePartner[0].url;

    if (count === 1 && flagName ==="" && flagUrl==="") {
//console.log(dd[0].SolutionPartner[0]._id.toString())
const p_id = await dd[0]._id.toString();
const c_id = await dd[0].ServicePartner[0]._id.toString();

console.log(p_id,"   ",c_id)

      await Partners.findOneAndUpdate({
        _id: p_id, "ServicePartner._id": c_id
      },
        {
          $set: {
            "ServicePartner.$.name": req.body?.name,
            "ServicePartner.$.url": req.body?.url,
          },
        },
        {
          useFindAndModify: false,
          new: true,
        }
      ).exec((err, data) => {
        if (err) {
          res.status(500).json({ message: "ServicePartner updated failed!!" });
        } else {
          res.status(200).json({
            message: "ServicePartner updated successfully",
            data: data,
          });
        }
      });
    }
     else {
      
      const id = dd[0]._id.toString() 

      await Partners.updateOne(
        { _id: id},
        {
          $push: {
            ServicePartner: {
              name: req.body?.name || "",
              url: req.body?.url || "",
            },
          },
        },
        (err, data) => {
          if (err) {
            res.status(500).send("ServicePartner insertion failed!!");
          } else {
            // console.log(data)
            res.status(200).send({ data: data, message: "ServicePartner inserted!!" });
          }
        }
      );
    }
  } 
else {
    await firstInsert(req.body);
    await Partners.findOneAndUpdate(
      {
        $set: {
          "ServicePartnerName.$.name": req.body?.name,
          "ServicePartnerUrl.$.url": req.body?.url,
        },
      },
      {
        useFindAndModify: false,
        new: true,
      }
    ).exec((err, data) => {
      if (err) {
        res.status(500).json({ message: "ServicePartner updated failed!!" });
      } else {
        res.status(200).json({
          message: "ServicePartner inserted successfully",
          data: data,
        });
      }
    });
  }
});

router.post("/addSolution", async (req, res) => {

  console.log('--------------ooopppp',req.body)

  const dataCount = await Partners.countDocuments({});

  if (dataCount === 1) {
    const dd = await Partners.find({}).select({
      Association: 0,
      ServicePartner: 0,
      reply: 0,
      __v: 0,
    });
const count = await dd[0].SolutionPartner.length;
const flagName =  await dd[0].SolutionPartner[0].name;
const flagUrl = await dd[0].SolutionPartner[0].url;

    if (count === 1 && flagName ==="" && flagUrl==="") {
//console.log(dd[0].SolutionPartner[0]._id.toString())
const p_id = await dd[0]._id.toString();
const c_id = await dd[0].SolutionPartner[0]._id.toString();

console.log(p_id,"   ",c_id)

      await Partners.findOneAndUpdate({
        _id: p_id, "SolutionPartner._id": c_id
      },
        {
          $set: {
            "SolutionPartner.$.name": req.body?.name,
            "SolutionPartner.$.url": req.body?.url,
          },
        },
        {
          useFindAndModify: false,
          new: true,
        }
      ).exec((err, data) => {
        if (err) {
          res.status(500).json({ message: "SolutionPartner updated failed!!" });
        } else {
          res.status(200).json({
            message: "SolutionPartner updated successfully",
            data: data,
          });
        }
      });
    }
     else {
      const id = dd[0]._id.toString() 

      await Partners.updateOne(
        { _id: id},
        {
          $push: {
            SolutionPartner: {
              name: req.body?.name || "",
              url: req.body?.url || "",
            },
          },
        },
        (err, data) => {
          if (err) {
            res.status(500).send("SolutionPartner insertion failed!!");
          } else {
            // console.log(data)
            res.status(200).send({ data: data, message: "SolutionPartner inserted!!" });
          }
        }
      );
    }
  } 
else {
    await firstInsert(req.body);
    await Partners.findOneAndUpdate(
      {
        $set: {
          "SolutionPartnerName.$.name": req.body?.name,
          "SolutionPartnerUrl.$.url": req.body?.url,
        },
      },
      {
        useFindAndModify: false,
        new: true,
      }
    ).exec((err, data) => {
      if (err) {
        res.status(500).json({ message: "SolutionPartner updated failed!!" });
      } else {
        res.status(200).json({
          message: "SolutionPartner inserted successfully",
          data: data,
        });
      }
    });
  }
});

router.post("/addAssociation", async (req, res) => {
  const dataCount = await Partners.countDocuments({});

  if (dataCount === 1) {
    const dd = await Partners.find({}).select({
      SolutionPartner: 0,
      ServicePartner: 0,
      reply: 0,
      __v: 0,
    });
const count = await dd[0].Association.length;
const flagName =  await dd[0].Association[0].name;
const flagUrl = await dd[0].Association[0].url;

    if (count === 1 && flagName ==="" && flagUrl==="") {
//console.log(dd[0].SolutionPartner[0]._id.toString())
const p_id = await dd[0]._id.toString();
const c_id = await dd[0].Association[0]._id.toString();

console.log(p_id,"   ",c_id)

      await Partners.findOneAndUpdate({
        _id: p_id, "Association._id": c_id
      },
        {
          $set: {
            "Association.$.name": req.body?.name,
            "Association.$.url": req.body?.url,
          },
        },
        {
          useFindAndModify: false,
          new: true,
        }
      ).exec((err, data) => {
        if (err) {
          res.status(500).json({ message: "Association updated failed!!" });
        } else {
          res.status(200).json({
            message: "Association updated successfully",
            data: data,
          });
        }
      });
    }
     else {
      const id = dd[0]._id.toString() 

      await Partners.updateOne(
        { _id: id},
        {
          $push: {
            Association: {
              name: req.body?.name || "",
              url: req.body?.url || "",
            },
          },
        },
        (err, data) => {
          if (err) {
            res.status(500).send("Association insertion failed!!");
          } else {
            // console.log(data)
            res.status(200).send({ data: data, message: "Association inserted!!" });
          }
        }
      );
    }
  } 
else {
    await firstInsert(req.body);
    await Partners.findOneAndUpdate(
      {
        $set: {
          "AssociationName.$.name": req.body?.name,
          "AssociationUrl.$.url": req.body?.url,
        },
      },
      {
        useFindAndModify: false,
        new: true,
      }
    ).exec((err, data) => {
      if (err) {
        res.status(500).json({ message: "Association updated failed!!" });
      } else {
        res.status(200).json({
          message: "Association inserted successfully",
          data: data,
        });
      }
    });
  }
});

// partner delete section
 
router.delete("/service/:id", async (req, res) => {
  const query = await Partners.find({}).select('_id')
  const id = query[0]._id.toString();
  await Partners.findOneAndUpdate(
     { _id: id},
     {
       $pull: {
        ServicePartner: {
            _id: req.params.id 
           }
       }
      },
      {
       useFindAndModify: false,
       new: true,
     }
   ).exec((err, data) => {
     if (err) {
       res.status(500).json({ message: "ServicePartner deletion failed!!" });
     } else {
       //console.log(data);
       res.status(200).json({ message: "ServicePartner deleted successfully!!" });
     }
   });
   
 });

router.delete("/solution/:id", async (req, res) => {
  const query = await Partners.find({}).select('_id')
  const id = query[0]._id.toString();
  await Partners.findOneAndUpdate(
     { _id: id},
     {
       $pull: {
        SolutionPartner: {
            _id: req.params.id 
           }
       }
      },
      {
       useFindAndModify: false,
       new: true,
     }
   ).exec((err, data) => {
     if (err) {
       res.status(500).json({ message: "SolutionPartner deletion failed!!" });
     } else {
       //console.log(data);
       res.status(200).json({ message: "SolutionPartner deleted successfully!!" });
     }
   });
   
 });

router.delete("/association/:id", async (req, res) => {
  const query = await Partners.find({}).select('_id')
  const id = query[0]._id.toString();
  await Partners.findOneAndUpdate(
     { _id: id},
     {
       $pull: {
        Association: {
            _id: req.params.id 
           }
       }
      },
      {
       useFindAndModify: false,
       new: true,
     }
   ).exec((err, data) => {
     if (err) {
       res.status(500).json({ message: "Association deletion failed!!" });
     } else {
       //console.log(data);
       res.status(200).json({ message: "Association deleted successfully!!" });
     }
   });
   
 });

//partner update section
router.put("/service/:id",async(req,res)=>{
  const query = await Partners.find({}).select('_id')
  const id = query[0]._id.toString();

  await Partners.findOneAndUpdate({
    _id: id, "ServicePartner._id": req.params.id
  },
    {
      $set: {
        "ServicePartner.$.name": req.body?.name,
        "ServicePartner.$.url": req.body?.url,
      },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json({ message: "ServicePartner updated failed!!" });
    } else {
      res.status(200).json({
        message: "ServicePartner updated successfully",
        // data: data,
      });
    }
  });
})

router.put("/solution/:id",async (req, res) => {
  const query = await Partners.find({}).select('_id')
  const id = query[0]._id.toString();

      await Partners.findOneAndUpdate({
        _id: id, "SolutionPartner._id": req.params.id
      },
        {
          $set: {
            "SolutionPartner.$.name": req.body?.name,
            "SolutionPartner.$.url": req.body?.url,
          },
        },
        {
          useFindAndModify: false,
          new: true,
        }
      ).exec((err, data) => {
        if (err) {
          res.status(500).json({ message: "SolutionPartner updated failed!!" });
        } else {
          res.status(200).json({
            message: "SolutionPartner updated successfully",
            // data: data,
          });
        }
      });
});

router.put("/association/:id",async(req,res)=>{
  const query = await Partners.find({}).select('_id')
  const id = query[0]._id.toString();

  await Partners.findOneAndUpdate({
    _id: id, "Association._id": req.params.id
  },
    {
      $set: {
        "Association.$.name": req.body?.name,
        "Association.$.url": req.body?.url,
      },
    },
    {
      useFindAndModify: false,
      new: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).json({ message: "Association updated failed!!" });
    } else {
      res.status(200).json({
        message: "Association updated successfully",
        // data: data,
      });
    }
  });
})

module.exports = router;
