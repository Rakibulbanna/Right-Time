const express = require("express");
const Partners = require("../schemas/Partners/Partners");
const router = express.Router();

router.get("/",async (req, res) => {
    try {
        const data = await Partners.find({})
    
        res.status(200).json(data);
      } catch (err) {
        res.status(500).send("server side error!");
      }
});

router.post("/addServicePartner", async (req, res) => {
  const data = await Partners.countDocuments({});
  if (data >= 1) {
    const id = await Partners.find({}).select('_id')
    console.log()
    await Partners.updateOne(
        { _id: id[0]._id.toString() },
        {
          $push: {
            ServicePartner: {
                  name: req.body?.ServicePartnerName ||"",
                  url: req.body?.ServicePartnerUrl || ""
                }
            //   ,
            //   SolutionPartner: 
            //     {
            //       name: req.body?.SolutionPartnerName,
            //       url: req.body?.SolutionPartnerUrl
            //     }
            //   ,
            //   Association:
            //     {
            //      name: req.body?.AssociationName,
            //       url: req.body?.AssociationUrl
            //     }
          },
        },
        
        (err, data) => {
          if (err) {
            res.status(500).send("ServicePartner insertion failed!!");
          } else {
            console.log(data)
            res.status(200).send({"data":data,"message":"ServicePartner inserted!!"});
          }
        }
      );

    //  res.send("alrady have one")
  } else {

    const newCollection = Partners({
        ServicePartner: [
          {
            name: req.body?.ServicePartnerName||"",
            url: req.body?.ServicePartnerUrl||""
          }
        ],
        SolutionPartner: [
          {
            name: req.body?.SolutionPartnerName||"",
            url: req.body?.SolutionPartnerUrl||""
          }
        ],
        Association: [
          {
           name: req.body?.AssociationName||"",
            url: req.body?.AssociationUrl||""
          }
        ]
      });

      await newCollection.save((err)=>{
        if (err) {
            res.status(500).json({ message: "Table created!!" });
          }
      });

console.log('table inserted successfully');

      const id = await Partners.find({}).select('_id ServicePartner')

    //   const serviceID = await id.ServicePartner._id;
    //   console.log('serviceid ',serviceID)
      await Partners.findOneAndUpdate(
        { _id: id},
        {
          $set: {
            "ServicePartner.$.name": req.body?.ServicePartnerName,
            "ServicePartner.$.url": req.body?.ServicePartnerUrl

          }
         },
         {
          useFindAndModify: false,
          new: true,
        }
      ).exec((err, data) => {
        if (err) {
          res.status(500).json({ message: "ServicePartner updated failed!!" });
        } 
      });

      res.status(200).json({
        message: "",
        data: data,
      });
   
  }
});
router.put("/", (req, res) => {});
router.delete("/", (req, res) => {});

module.exports = router;
