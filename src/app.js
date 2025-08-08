const express = require("express");    // npm i -g nodemon (whenever i chaged the any code then it will automatically update);
const app = express();


app.use("/user",[ (req,res,next) => {
    console.log("Handling the route user!");
    next();
    // res.send("Hi Bro!");
},
(req,res,next) => {
    console.log("Handling the route user 2!");    
    // res.send("2nd Brother!");
    next();
},
(req,res) => {
    console.log("Handling the route user 3!");    
    res.send("3rd Brother!");
}
])

app.listen(3000, () => {

    console.log("Server is successfully listening on port 3000...");
});
