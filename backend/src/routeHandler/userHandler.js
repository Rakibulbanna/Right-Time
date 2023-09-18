const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const {login, register, allUser, adduser, updateUser} = require('../controllers/userController')

const authenticate = require('../config/Authenticate')



router.post('/register',register)

router.post('/login',login)

router.get('/all',allUser)

router.post("/adduser",adduser);

router.put("/update-user",authenticate,updateUser);

module.exports = router;
