const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json()); 



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
app.patch("/user", async (req,res) => {
    const userId = req.body.userId;
    const data = req.body;
    console.log(data);
    try{
        await User.findByIdAndUpdate({_id: userId},data);
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("something went wrong");
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
