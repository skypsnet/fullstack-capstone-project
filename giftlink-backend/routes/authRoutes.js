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
        logger.info('User registered sucessfully')
        res.json({authtoken, email});    

    }catch(e){
        return res.status(500).send('Internal server error')
    }
          
});

module.exports = router;