const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");



authRouter.post("/signup", async (req, res) => {
    try {
        // validate of data
        validateSignUpData(req);

        const { firstName,lastName,emailId,password } = req.body;
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password,10);
        console.log(passwordHash);

        // Creating a new instance of the User model
        const user = new User({
            firstName,lastName,emailId,password:passwordHash,
        });
        await user.save();
        res.send("User Added successfully");
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }

});

authRouter.post("/login", async(req,res) => {
    try{
        const { emailId,password } = req.body;
        
        const user = await User.findOne({ emailId: emailId});
        if(!user) throw new Error("Invalid credentials");
        const isPassword = await user.validatePassword(password);
        if(isPassword) {

            // Create a JWT Token
            const token = await user.getJWT();

            // Add the token to cookie and send the response back to the user
            res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000)});
            res.status(200).send("Login Sucessfully");
        } else {
            throw new Error("Invalid credentials");
        }

    } catch(err){
        res.status(404).send("ERROR : "+ err.message);
    }
})


module.exports = authRouter;