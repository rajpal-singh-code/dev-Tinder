const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json()); 

app.post("/signup", async (req, res) => {
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

// Get user by email
app.get("/user", async (req,res) => {
    const userEmail = req.body.emailId;
    try{
        const user = await User.findOne({emailId: userEmail});
        res.send(user);
        // const data = await User.find({emailId: userEmail});
        // if(data.length === 0)
        //     res.status(404).send("User not found");
        // else
        //     res.send(data);
    }
    catch(err) {
        res.status(400).send("Something went wrong ", + err.message);
    }
});

// Login Api
app.post("/login", async(req,res) => {
    try{
        const { emailId,password } = req.body;
        
        const user = await User.findOne({ emailId: emailId});
        if(!user) throw new Error("Invalid credentials");
        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword) throw new Error("Invalid credentials");
        else res.status(200).send("Login Sucessfully");
    } catch (err){
        res.status(404).send("ERROR : "+ err.message);
    }
})

// Feed API - GET/feed -get all the users from the database
app.get("/feed",async (req,res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
});

// Delete a user from database
app.delete("/user", async (req,res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({_id: userId});
        // const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

// Update data of the user
app.patch("/user/:userId", async (req,res) => {
    const userId = req.params?.userId;
    const data = req.body;
    
    try {
        const ALLOWED_UPDATED = ["age","about","skills","gender","photoUrl","firstName","lastName"];
        const isUpdatedAllowed = Object.keys(data).every((k) =>
            k === "userId" || ALLOWED_UPDATED.includes(k)
        );
        if(!isUpdatedAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length>10){
            throw new Error("cannot add more than 10 skill")
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data ,{
            returnDocument: "after",
            runValidators: true,
        });
        console.log(user);
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send(err.message + ": something went wrong");
    }
})

// app.patch("/user", async(req,res) => {
//     const emailId = req.body.emailId;
//     const data = req.body;
//     try{
//         await User.findOneAndUpdate({emailId: emailId},data, {
//             runValidators: true,
//             returnDocument: "after",
//         });
//         res.send("User Updated successfully");
//     } catch(err) {
//         res.status(400).send("UPDATED FAILED :" + err.message);
//     }
// })

connectDB()
    .then(() => {
        console.log("Database Connection is Established Successfully...");
        app.listen(3000, () => {
            console.log("Server is successfully listening on port 3000...");
        });
    })
    .catch((err) => {
        console.error("Connection is not Established:", err.message);
    });



    // if you want to use validator then install : npm install validator
    // if you want to password encrypt then install : npm install bcrypt
