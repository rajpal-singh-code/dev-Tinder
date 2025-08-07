const express = require("express");    // npm i -g nodemon (whenever i chaged the any code then it will automatically update);
const app = express();

// This will only handle GET call to /user
app.get("/user", (req,res) => {
    res.send({firstName: "Rajpal", lastName: "Kumar"})
})

// This will only handle POST call to /user
app.post("/user", (req,res) => {
    res.send("Data successfully saved to the database");
})

// This will only handle DELETE call to /user
app.delete("/user", (req,res) => {
    res.send("Deleted Successfully");
})

app.patch("/user", (req,res) => {
    res.send("Data is Patched");
})


app.use("/test", (req, res) => {
    res.send("Hello from the server!");  // ← send response to browser
});


app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...");
});
