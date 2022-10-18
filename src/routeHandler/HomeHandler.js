const express = require('express');
const BannerCarosor = require('../schemas/HomePage/BannerCarosor');
const { route } = require('./todoHandler');
const router = express.Router();



router.get('/banner',async(req,res)=>{
try{
 const data = await BannerCarosor.find();
 res.status(200).json(data);
}catch(err){
    res.status(500).send("server side error!");
}
})

router.post('/banner',(req,res)=>{
const newBanner = new BannerCarosor(req.body);
try{
    const data = newBanner.save();
    res.status(200).json({
        message: "BannerCarosor inserted successfully",
        data: data,
      });
}catch(err){
    res.status(500).send({
        message: "server side error!"
      })
}
})

router.put('/banner',async(req,res)=>{
    //console.log(req.body)
    await BannerCarosor.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            title: req.body?.title,
           subtitle: req.body?.subtitle,
           photoURL: req.body?.photoURL
       },
        },
        {
          useFindAndModify: false,
          new: true,
        }
      ).exec((err, data) => {
        if (err) {
          res.status(500).json({ message: "updating error!" });
        } else {
          console.log(data);
          res.status(200).json({ message: "updated successfully!" });
        }
      });
})



module.exports = router;