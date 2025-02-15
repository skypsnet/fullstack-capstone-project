/*jshint esversion: 8 */

const {Router} = require('express');
const connectToDatabase = require("../models/db");
const pino = require('pino');
const router = Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const {body, validationResult} = require('express-validator');

const logger = pino();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res)=>{
    const {email, password, firstName, lastName} = req.body;
 
    try{
         const db = await connectToDatabase();
         const collection = db.collection("users");
         const existingEmail = await collection.findOne({email: email});
         const salt = await bcryptjs.genSalt(10);
         const hash = await bcryptjs.hash(password, salt);
         const newUser = await collection.insertOne({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hash,
                createdAt: new Date()
            })

         const payload = {
                user: {
                   id: newUser.insertedId,
                },
            };

        const authtoken = jwt.sign(payload, JWT_SECRET);
        logger.info('User registered sucessfully');
        res.json({authtoken, email});    

    }catch(e){
        return res.status(500).send('Internal server error');
    }
          
});

router.post('/login', async (req, res)=>{
    
    try{
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const {email, password} =  req.body;
    console.log(email, password);
    const theUser = await collection.findOne({email: email});

    if(theUser){
       let result = await bcryptjs.compare(password, theUser.password);
       if(!result){
          logger.error("Passwords do not match");
          return res.status(404).json({error: "Wrong password!"});
       }
       
       const userName = theUser.firstName;
       const userEmail = theUser.email;

       const payload = {
          user: {
            id: theUser._id.toString(),
          }
       }

       const authtoken = jwt.sign(payload, JWT_SECRET);
       logger.info('User logged in successfully');
       return res.status(200).json({authtoken, userName, userEmail});


    }else{
        logger.error('User not found');
        return res.status(404).json({message: "user not found"});
    }

    }catch(e){
        console.error(e.message);
    }

})

router.put('/update', async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        logger.error('Validation errors in update request', errors.array());
        return res.status(400).json({errors: errors.array()});
    }
    
    try{
    
        const email = req.headers.email;
        console.log(email);
        if(!email){
            logger.error("Email not found in the request headers");
            return res.status(400).json({error: "Email not found in the request header"});
        }
        
        const db = await connectToDatabase();
        const collection = db.collection("users");
        const existingUser = await collection.findOne({email});
        console.log(existingUser);
        const updatedUser = await collection.findOneAndUpdate(
            { email},
            { $set: existingUser },
            { returnDocument: 'after' }
        );
        const payload = {
            user: {
                id: updatedUser._id.toString(),
            }
        }

        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({authtoken});

    }catch(e){
        return res.status(500).json({message: "Internal Server Error"});
    }
});

module.exports = router;