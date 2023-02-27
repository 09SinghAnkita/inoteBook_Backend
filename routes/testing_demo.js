const express = require('express');
const User = require('../models/User')
const router = express.Router();
const {body, validationResult} = require('express-validator')

// Create a user using: POST "/api/auth/createruser". No login required
router.post('/createruser',[
body('name','Enter a valid name').isLength({min:3}),
body('email' ,'Enter a valid email').isEmail(),
body('password',"Password atleadt must be 5 letters").isLength({min:5}),
]
,(req,res)=>{
// If there are errors, return bad request and the errors  
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    User.create({
       name: req.body.name,
        email: req.body.email,  
        password: req.body.password,  
    }).then(user=>res.json(user))
    .catch(err=>{console.log(err)
    res.json({error: 'Please enter a unique value for email', message : err.message})})
})

module.exports = router