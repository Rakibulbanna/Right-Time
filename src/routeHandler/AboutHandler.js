const express = require('express');
const About = require('../schemas/About/About');
const TeamMember = require('../schemas/About/TeamMember');

const router = express.Router();

router.get('/',async(req,res)=>{
    try{
    const about = await About.findOne({});
    const team = await TeamMember.find({}); 
    res.status(200).send({about,team});

    }catch(err){
        res.status(500).send({message:"server error!"})
    }
   
    
})
router.post('/add',async(req,res)=>{
    try{
        const cnt = await About.countDocuments();
        if (!cnt){
            const newAbout = new About({
                title: req.body?.title,
                divDescription:req.body?.divDescription
            });
            await newAbout.save();
        }
       const newTeamMember = new TeamMember({
        name:req.body?.name,
        imgUrl:req.body?.imgUrl,
        designation: req.body?.designation,
        description: req.body?.description
       })
       await newTeamMember.save()

    res.status(200).send({message:"About insertion success !!"});

    }catch(err){
        res.status(500).send({message:"server error!"})
    }
     
})

router.put('/:id',async (req,res)=>{
    try{
        await About.updateOne(
            {_id: req.params.id},
            {
                $set:{
                    title: req.body?.title,
                    divDescription:req.body?.divDescription
            
                }
            },
            {
                new: true,
                useFindAndModify: false,
            }
            )

        res.status(200).send({message:"About updated successfully!"})
    }
    catch(err){
        res.status(500).send({message:"server error!"})
    }
})
router.put('/teamMember/:id',async (req,res)=>{
    try{
        await TeamMember.updateOne(
            {_id: req.params.id},
            {
                $set:{
        name:req.body?.name,
        imgUrl:req.body?.imgUrl,
        designation: req.body?.designation,
        description: req.body?.description
            
                }
            },
            {
                new: true,
                useFindAndModify: false,
            }
            )

        res.status(200).send({message:"about TeamMember updated successfully!"})
    }
    catch(err){
        res.status(500).send({message:"server error!"})
    }
})

router.delete('/teamMember/:id',async (req,res)=>{
    try{
        await TeamMember.deleteOne({_id: req.params.id})

        res.status(200).send({message:"TeamMember deleted successfully!"})
    }
    catch(err){
        res.status(500).send({message:"server error!"})
    }
})

module.exports = router;