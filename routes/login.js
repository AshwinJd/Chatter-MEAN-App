const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../config/database');
const passport = require('passport');
const jwt = require('jsonwebtoken')
const User = require('../models/users');


router.post('/register', (req, res, next) =>{
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  User.addUser(newUser, (err, user)=>{
    if(err){
      res.json({success: false, msg:'Failed to add user'})
    }else {
      res.json({success: true, msg:'user registered'})
    }
  });
})
router.post('/authenticate', (req, res, next) =>{
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
})
module.exports = router;