const express = require('express');
const Career = require('../schemas/Career/Career');
const router = express.Router();
const fs = require('fs')
const path = require('path')

// career
/*
title: {
    type: String,
  },
  coverPhoto: {
    type: String,
    
  },
  description: {
    type: String,
  },
*/

router.get('/', async (req, res) => {
    try {

        const team = await Career.find({});
        res.status(200).send(team);

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "server error!" })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const team = await Career.findOne({ _id: req.params.id });
        res.status(200).send(team);

    } catch (err) {
        res.status(500).send({ message: "server error!" })
    }
})
router.post('/', upload.single('coverPhoto'), async (req, res) => {
    try {
        const newCareer = new Career({ ...req.body, coverPhoto: req.file.originalname })
        await newCareer.save()

        res.status(200).send({ message: "Career insertion success !!" });

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "server error!" })
    }

})
router.put('/:id', upload.single('coverPhoto'), async (req, res) => {

    try {
        const data = await Career.findOne({ _id: req.params.id })
      
        const image = await data?.coverPhoto;

        const filePath = path.join("./uploaded_file", image);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }

        await Career.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    title: req.body?.title,
                    coverPhoto: req?.file?.originalname,
                    description: req.body?.description

                }
            },
            {
                new: true,
                useFindAndModify: false,
            }
        )


        res.status(200).send({ message: "Career updated successfully!" })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "server error!" })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const data = await Career.findOne({ _id: req.params.id })

        //console.log(data)
        const image = await data?.coverPhoto;

        const filePath = path.join("./uploaded_file", image);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }

        await Career.deleteOne({ _id: req.params.id })

        res.status(200).send({ message: "Career deleted successfully!" })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "server error!" })
    }
})

module.exports = router;