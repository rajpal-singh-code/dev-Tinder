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
// app.patch("/user", async (req,res) => {
//     const userId = req.body.Id;
//     const data = req.body;
//     console.log(data);
//     try{
//         await User.findByIdAndUpdate({_id: userId},data);
//         res.send("User updated successfully");
//     } catch (err) {
//         res.status(400).send("something went wrong");
//     }
// })

app.patch("/user", async(req,res) => {
    const emailId = req.body.emailId;
    const data = req.body;
    try{
        await User.findOneAndUpdate({emailId: emailId},data, {
            runValidators: true,
            returnDocument: "after",
        });
        res.send("User Updated successfully");
    } catch(err) {
        res.status(400).send("UPDATED FAILED :" + err.message);
    }
})

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


    ///hello