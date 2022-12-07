const express = require("express");
const Industries = require("../schemas/Industries/Industries");
const { IndustriesUpload } = require("../util/upload");
const router = express.Router();
const fs = require('fs')
const path = require('path')
// ADMIN- all Industries get

router.get("/", async (req, res) => {
    try {
      const data = await Industries.find({});
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
  });
router.get("/:id", async (req, res) => {
    try {
      const data = await Industries.findOne({_id:req.params.id});
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
});
// CLIENT- Industries trainning get

router.get("/name", async (req, res) => {
    try {
      const data = await Industries.findOne({name:req.body.name});
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send("server side error!");
    }
});

//ADMIN- Industries post

  router.post('/',IndustriesUpload.single('coverPhoto'),async (req,res)=>{
    try {
        const newIndustries = new Industries({ ...req.body, coverPhoto: req.file.originalname });
        await newIndustries.save()
        res.status(200).json({message:"Industries added !"});
      } catch (err) {
        console.log(err)
        res.status(500).send({message:"server side error!"});
      }
})


router.delete('/:id',async(req,res)=>{
//const filePath = path.join(__dirname, '../uploaded_file')
try{
const filePath = path.join("./Industries_upload",req.params.id);
fs.unlinkSync(filePath)
res.status(200).send("file delete success!")
}catch(err){
  console.log(err)
res.status(500).send("failed")
}

})
//ADMIN- Industries update

router.put('/:id',IndustriesUpload.single('coverPhoto'),async (req,res)=>{
    try{
      await Industries.findByIdAndUpdate(
        {_id: req.params.id},
        {
          $set:{
            name:req.body?.name,
            coverPhoto:req?.file?.originalname,
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

router.delete("/:id",async(req,res)=>{
    try{
      await Industries.deleteOne({ _id:  req.params.id})
      res.status(200).send("Industries deleted!")
    }
    catch(err){
        res.status(500).json({ message: "Industries deletion failed!!" });  
    }
  });



  module.exports = router;