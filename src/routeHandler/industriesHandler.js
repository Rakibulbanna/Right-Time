const express = require("express");
const Industries = require("../schemas/Industries/Industries");
const router = express.Router();

// ADMIN- all Industries get

router.get("/all", async (req, res) => {
    try {
      const data = await Industries.find({});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });

// CLIENT- Industries trainning get

router.get("/:name", async (req, res) => {
    try {
      const data = await Industries.findOne({name:req.params.name});
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
});

//ADMIN- Industries post

  router.post('/add',async (req,res)=>{
    try {
        const newIndustries = new Industries(req.body);
        await newIndustries.save()
        res.status(200).json({message:"Industries added !"});
      } catch (err) {
        res.status(500).send({message:"server side error!"});
      }
})

//ADMIN- Industries update

router.put('/IndustriesUpdate/:id',async (req,res)=>{
    try{
      await Industries.findByIdAndUpdate(
        {_id: req.params.id},
        {
          $set:{
            name:req.body?.name,
            coverPhoto:req.body?.coverPhoto,
            div:req.body?.div
            
          }
  
        },
        {
          new: true,
          useFindAndModify: false,
        }
      )
      res.status(200).send({message:"Industries updated successfully ! "})
    }catch(err){
      res.status(200).json({
        message: "server error !",
      });
    }
})

// DONE delete

router.delete("/IndustriesDelete/:id",async(req,res)=>{
    try{
      await Industries.deleteOne({ _id:  req.params.id})
      res.status(200).send("Industries deleted!")
    }
    catch(err){
        res.status(500).json({ message: "Industries deletion failed!!" });  
    }
  });



  module.exports = router;