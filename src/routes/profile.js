const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");


const { userAuth } = require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/validation");


profileRouter.get("/profile/view", userAuth, async (req,res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : "+ err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req,res) => {
    try {
        if(!validateEditProfileData(req))
            throw new Error("Invalid Edit Request");

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, Profile updated Successfully`,
            data: loggedInUser,
        });
    } catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/password", async (req,res) => {
    try{
        const { emailId, newPassword } = req.body;
        if(!emailId || !newPassword)
            throw new Error("Invalid credentailas");

       
        if(!validator.isStrongPassword(newPassword)) 
            throw new Error("This is not strong password : " + newPassword);

        const user = await User.findOne({emailId })
        if(!user) throw new Error("User not found");

        const passwordhash = await bcrypt.hash(newPassword,10);
        user.password = passwordhash;
        
        await user.save();
        res.send("Password is reset successfully");
    } catch(err) {
        res.status(404).send("ERROR : " + err.message);
    }
})


module.exports = profileRouter;

