const express = require('express');
const ClientContact = require('../schemas/Contact/ClientContact');
const Contact = require('../schemas/Contact/Contact');
const router = express.Router();

// contact

router.get('/',async (req,res)=>{
    try {
        const data = await Contact.find({}); 
        //  const data = await Training.find({}).populate('Assessment')
        res.status(200).json(data);
      } catch (err) {
        res.status(500).send({message:"server side error!"});
      }
})
router.post('/add',async (req,res)=>{
    try {
        const newContact = new Contact(req.body);
        await newContact.save()
        res.status(200).json({message:"contact added !"});
      } catch (err) {
        res.status(500).send({message:"server side error!"});
      }
})
router.delete('/:id',async (req,res)=>{
    try {
        await Contact.deleteOne({_id:req.params.id});
        //  const data = await Training.find({}).populate('Assessment')
        res.status(200).json({message:"contact deleted !"});
      } catch (err) {
        res.status(500).send({message:"server side error!"});
      }
})

// client Contact

router.post('/add',async (req,res)=>{
    try {
        const newContact = new ClientContact(req.body);
        await newContact.save()
        res.status(200).json({message:"Client Contact added !"});
      } catch (err) {
        res.status(500).send({message:"server side error!"});
      }
})
router.delete('/:id',async (req,res)=>{
    try {
        await ClientContact.deleteOne({_id:req.params.id});
        //  const data = await Training.find({}).populate('Assessment')
        res.status(200).json({message:"Client Contact deleted !"});
      } catch (err) {
        res.status(500).send({message:"server side error!"});
      }
})
module.exports = router;