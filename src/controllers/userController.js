const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const {serverError, resourceError} = require('../util/error')

const userSchema = require('../schemas/UserSchema')

const user = mongoose.model("user", userSchema);



// login controller
    module.exports.login = async (req, res) =>{
    let { email, password } = req.body
    let validate = loginValidator({ email, password })
    
    if (!validate.isValid) {
        return res.status(400).json(validate.error)
    }
    
  await user.findOne({ email })
        // Use Populate for transaction
        .then(u => {
            if (!u) {
                return resourceError(res, 'User Not Found')
            }
            bcrypt.compare(password, u.password, (err, result) => {
                if (err) {
                    return serverError(res, err)
                }
                if (!result) {
                    return resourceError(res, 'Password Doesn\'t Match')
                }
  
                let token = jwt.sign({
                    _id: u._id,
                    name: u.name,
                    email: u.email
                    
                }, 'RAKIB', {expiresIn: '2h'})
  
                res.status(200).json({
                    message: 'Login Successful',
                    token: `Bearer ${token}`
                })
  
            })
        })
        .catch(error => serverError(res, error))
  
    // Generate Token and Response Back
  }
  // Registration controller
    module.exports.register = async (req, res)=> {
        let { name, email, password, confirmPassword,uid } = req.body
        let validate = registerValidator({ name, email, password, confirmPassword,uid })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            user.findOne({ email })
                .then(u => {
                    if (u) {
                        return resourceError(res, 'Email Already Exist')
                    }
      
                    bcrypt.hash(password, 11, (err, hash) => {
                        if (err) {
                          console.log(err)
                            return resourceError(res, 'Server Error Occurred')
                        }
       
                        const newuser = new user({
                            name,
                            email,
                            password: hash,
                            uid
                        })
                        

                        newuser.save()
                            .then(u => {
                                res.status(201).json({
                                    message: 'User Created Successfully',
                                    u
                                })
                            })
                            .catch(error => serverError(res, error))
                    })
                })
                .catch(error => serverError(res, error))
        }
    }
// All user controller
     module.exports.allUser = async(req, res) =>{

      // sort descending order

      if(req.body.order === 'descending'){

        await user.find().sort({ date : 'desc' }).exec((err, doc)=>{
        if(err){
          serverError(res, err)
        }
        else{
          res.status(200).json(doc)
        }
        });
      }
       // filter given cherecter greater

      else if (req.body.order === 'filterGrater'){
        await user.find(
          {
            name: { $gte: `${req.body.field}` }
         }
        ).exec((err, doc)=>{
          if(err){
            serverError(res, err)
          }
          else{
            res.status(200).json(doc)
          }
          });
      }

      // filter given cherecter smaller

      else if (req.body.order === 'filterSmaller'){
        await user.find(
          {
            name: { $lte: `${req.body.field}` }
         }
        ).exec((err, doc)=>{
          if(err){
            serverError(res, err)
          }
          else{
            res.status(200).json(doc)
          }
          });
      }

       // sort asending order
      else{
        await user.find().exec((err, doc)=>{
          if(err){
            serverError(res, err)
          }
          else{
            res.status(200).json(doc)
          }
          });
      }
      
            // .then(users => {
            //     res.status(200).json(users)
            // })
            // .catch(error => serverError(res, error))
    }
//adding user

module.exports.adduser = async (req, res) => {
    // console.log(req.body)
 
   const newuser = new user(req.body);
   try {
     const data = await newuser.save();
     res.status(200).json({
       message: "user inserted successfully",
       data: data,
     });
   } catch (err) {
     if (err.code === 11000) {
       res.status(500).send("This user is alrady taken!");
     } else {
       res.status(500).send("server side error!");
     }
   }
 } 
 //update user photo
 module.exports.updateUser = async (req, res) => {
    if (req.body.photoURL) {
      await user
        .findOneAndUpdate(
          { uid: req.body.uid },
          {
            $set: {
              photoURL: req.body.photoURL,
            },
          },
          {
            useFindAndModify: false,
            new: true,
          }
        )
        .exec((err, data) => {
          if (err) {
            res
              .status(500)
              .json({ message: "user profile photo updating error!" });
          } else {
            console.log(data);
            res
              .status(200)
              .json({ message: "user profile photo updated successfully!" });
          }
        });
    }
    if (req.body.displayName) {
      await user
        .findOneAndUpdate(
          { uid: req.body.uid },
          {
            $set: {
              displayName: req.body.displayName,
            },
          },
          {
            useFindAndModify: false,
            new: true,
          }
        )
        .exec((err, data) => {
          if (err) {
            res
              .status(500)
              .json({ message: "user profile name updating error!" });
          } else {
            console.log(data);
            res
              .status(200)
              .json({ message: "user profile namae updated successfully!" });
          }
        });
    }
  }
  //update password
