const express = require('express');
const About = require('../schemas/About/About');
const TeamMember = require('../schemas/About/TeamMember');
const { upload } = require('../util/upload');
const fs = require('fs')
const path = require('path')

const router = express.Router();

// About schema
/*
    title:{
        type:String
    },
    divDescription:{
        type: String,
    }

*/

router.get('/', async (req, res) => {
    try {
        const about = await About.findOne({});
        res.status(200).send(about);

    } catch (err) {
        res.status(500).send({ message: "server error!" })
    }

})

router.post('/', async (req, res) => {
    try {
        const cnt = await About.countDocuments();
        if (!cnt) {
            const newAbout = new About({
                title: req.body?.title,
                divDescription: req.body?.divDescription
            });
            await newAbout.save();
            res.status(200).send({ message: "About insertion success !!" });
        }
        else {
            res.status(200).send({ message: "You have to update About !!" });
        }
    } catch (err) {
        res.status(500).send({ message: "server error!" })
    }

})
router.put('/:id', async (req, res) => {
    try {
        await About.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    title: req.body?.title,
                    divDescription: req.body?.divDescription

                }
            },
            {
                new: true,
                useFindAndModify: false,
            }
        )

        res.status(200).send({ message: "About updated successfully!" })
    }
    catch (err) {
        res.status(500).send({ message: "server error!" })
    }
})

//Team member
/*
    name:{
        type: String,
        require: true
    },
    imgUrl:{
        type:String
    }
    ,
    designation:{
        type: String,
        require: true
    },
    description:{
        type: String
    },
*/
router.get('/teamMember', async (req, res) => {
    try {

        const team = await TeamMember.find({});
        res.status(200).send(team);

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "server error!" })
    }
})
router.get('/teamMember/:id', async (req, res) => {
    try {
        const team = await TeamMember.findOne({ _id: req.params.id });
        res.status(200).send(team);

    } catch (err) {
        res.status(500).send({ message: "server error!" })
    }
})
router.post('/teamMember', upload.single('imgUrl'), async (req, res) => {
    try {
        const newTeamMember = new TeamMember({ ...req.body, imgUrl: req.file.originalname })
        await newTeamMember.save()

        res.status(200).send({ message: "team member insertion success !!" });

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "server error!" })
    }

})
router.put('/teamMember/:id', upload.single('imgUrl'), async (req, res) => {

    try {
        const data = await TeamMember.findOne({ _id: req.params.id })
        console.log(data)
        const image = await data?.imgUrl;

        const filePath = path.join("./uploaded_file", image);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }

        await TeamMember.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body?.name,
                    imgUrl: req?.file?.originalname,
                    designation: req.body?.designation,
                    description: req.body?.description

                }
            },
            {
                new: true,
                useFindAndModify: false,
            }
        )


        res.status(200).send({ message: "about TeamMember updated successfully!" })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "server error!" })
    }
})
router.delete('/teamMember/:id', async (req, res) => {
    try {
        const data = await TeamMember.findOne({ _id: req.params.id })

        //console.log(data)
        const image = await data?.imgUrl;

        const filePath = path.join("./uploaded_file", image);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }


        await TeamMember.deleteOne({ _id: req.params.id })

        res.status(200).send({ message: "TeamMember deleted successfully!" })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "server error!" })
    }
})

module.exports = router;