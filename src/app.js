const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json()); 

app.use("/signup", async (req, res) => {
    // Creating a new instance of the User model
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User Added successfully");
    } catch (err) {
        res.status(500).send("Error saving the user: " + err.message);
    }

    console.log(req.body)
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
