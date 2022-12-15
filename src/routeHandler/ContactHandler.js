const express = require('express');
const ClientContact = require('../schemas/Contact/ClientContact');
const Contact = require('../schemas/Contact/Contact');
const { upload } = require('../util/upload');
const fs = require('fs')
const path = require('path')

const router = express.Router();

// contact
/*
title: {
    type: String,
  },
  coverPhoto: {
    type: String,
  },
  address:{
    type: String
  },
  phone:{
    type: String
  },
  email:{
    type: String
  },
  description: {
    type: String,
  },
*/
router.get('/', async (req, res) => {
  try {
    const data = await Contact.find({});
    //  const data = await Training.find({}).populate('Assessment')
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({ message: "server side error!" });
  }
})
router.get('/:id', async (req, res) => {
  try {
    const data = await Contact.findOne({ _id: req.params.id });
    //  const data = await Training.find({}).populate('Assessment')
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({ message: "server side error!" });
  }
})
router.post('/', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save()
    res.status(200).json({ message: "contact added !" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server side error!" });
  }
})
router.delete('/:id', async (req, res) => {
  try {

    await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "contact deleted !" });
  } catch (err) {
    res.status(500).send({ message: "server side error!" });
  }
})

// client Contact

/*
  name: {
    type: String,
    require:true
  },
  email: {
    type: String,
    require:true
  },
  message:{
    type: String,
    require:true
  },
 */

  router.get('/clientContact/',async(req,res)=>{
    try {
      const data = await ClientContact.find({});
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send({ message: "server side error!" });
    }
  })
router.post('/clientContact/', async (req, res) => {
  try {
    const newContact = new ClientContact(req.body);
    await newContact.save()
    res.status(200).json({ message: "Client Contact added !" });
  } catch (err) {
    res.status(500).send({ message: "server side error!" });
  }
})
router.delete('/clientContact/:id', async (req, res) => {
  try {

    await ClientContact.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Client Contact deleted !" });

  } catch (err) {
    res.status(500).send({ message: "server side error!" });
  }
})
module.exports = router;