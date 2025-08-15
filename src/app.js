const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json()); // Middleware to parse JSON body

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
