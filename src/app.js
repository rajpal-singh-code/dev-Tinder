const express = require("express");    // npm i -g nodemon (whenever i chaged the any code then it will automatically update);
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin",adminAuth);

app.get("/user", userAuth, (req,res) => {
    res.send("User Data Sent");
})

app.get("/admin/getAllData", (req,res) => {
    res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req,res) => {
    res.send("Deleted a User");
});

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...");
});


