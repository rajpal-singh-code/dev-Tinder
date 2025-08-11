const express = require("express");    // npm i -g nodemon (whenever i chaged the any code then it will automatically update);
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");

app.post("/signup", async (req,res) => {
    const user = new User({
        firstName: "virat",
        lastName: "singhkohli",
        emailId: "viratfiufh2022@gmail.com",
        password: "viratsingh123",
        gender: "Male",
        age: 40,
    })

    try {
        await user.save();
        res.send("User Added successfully");
    } catch (err) {
        res.status(404).send("Error saving the user:" + err.message)
    }
});

connectDB()
    .then(() =>{
        console.log("Database Connection is Establish Successfully.....");

        app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000...");
        });  
    })
    .catch((err) => {
        console.error("Connection is not Established");
    })
    



