const express = require("express");    // npm i -g nodemon (whenever i chaged the any code then it will automatically update);
const app = express();

app.use("/h",(req, res) => {
    res.send("welcome to Rajpal");
})

app.use("/hello",(req, res) => {
    res.send("Hello hello hello");
})

app.use("/test", (req, res) => {
    res.send("Hello from the server!");  // ← send response to browser
});

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...");
});
