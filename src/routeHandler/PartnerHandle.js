const express = require("express");
const Partners = require("../schemas/Partners/Partners");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Partners.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("server side error!");
  }
});

const firstInsert = async (e) => {
  const newCollection = Partners({
    ServicePartner: [
      {
        name: e?.ServicePartnerName || "",
        url: e?.ServicePartnerUrl || "",
      },
    ],
    SolutionPartner: [
      {
        name: e?.SolutionPartnerName || "",
        url: e?.SolutionPartnerUrl || "",
      },
    ],
    Association: [
      {
        name: e?.AssociationName || "",
        url: e?.AssociationUrl || "",
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

router.post("/addServicePartner", async (req, res) => {
  const data = await Partners.countDocuments({});
  if (data >= 1) {
    const id = await Partners.find({}).select("_id");

    await Partners.updateOne(
      { _id: id[0]._id.toString() },
      {
        $push: {
          ServicePartner: {
            name: req.body?.ServicePartnerName || "",
            url: req.body?.ServicePartnerUrl || "",
          },
        },
      },
      (err, data) => {
        if (err) {
          res.status(500).send("ServicePartner insertion failed!!");
        } else {
          console.log(data);
          res
            .status(200)
            .send({ data: data, message: "ServicePartner inserted!!" });
        }
      }
    );
  } else {
    await firstInsert(req.body);
    const id = await Partners.find({}).select("_id ServicePartner");

    await Partners.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          "ServicePartner.$.name": req.body?.ServicePartnerName,
          "ServicePartner.$.url": req.body?.ServicePartnerUrl,
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

router.post("/addSolutionPartner", async (req, res) => {
  const dataCount = await Partners.countDocuments({});

  if (dataCount === 1) {
    const dd = await Partners.find({}).select({
      Association: 0,
      ServicePartner: 0,
      reply: 0,
      __v: 0,
    });

    const count = await dd[0].SolutionPartner.length;

    if (count === 1) {
//console.log(dd[0].SolutionPartner[0]._id.toString())
const p_id = dd[0]._id.toString();
const c_id =dd[0].SolutionPartner[0]._id.toString();
console.log(p_id,"   ",c_id)
      await Partners.findOneAndUpdate({
        _id: p_id, "SolutionPartner._id": c_id
      },
        {
          $set: {
            "SolutionPartnerName.$.name": req.body?.SolutionPartnerName,
            "SolutionPartnerUrl.$.url": req.body?.SolutionPartnerUrl,
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
      const id = await Partners.find({}).select("_id");
      await Partners.updateOne(
        { _id: id[0]._id.toString() },
        {
          $push: {
            SolutionPartner: {
              name: req.body?.SolutionPartnerName || "",
              url: req.body?.SolutionPartnerUrl || "",
            },
          },
        },
        (err, data) => {
          if (err) {
            res.status(500).send("SolutionPartner insertion failed!!");
          } else {
            // console.log(data)
            res
              .status(200)
              .send({ data: data, message: "SolutionPartner inserted!!" });
          }
        }
      );
    }
  } else {
    await firstInsert(req.body);
    await Partners.findOneAndUpdate(
      {
        $set: {
          "SolutionPartnerName.$.name": req.body?.SolutionPartnerName,
          "SolutionPartnerUrl.$.url": req.body?.SolutionPartnerUrl,
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

router.put("/", (req, res) => {});
router.delete("/", (req, res) => {});

module.exports = router;
