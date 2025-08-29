const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");


app.use(express.json()); 
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


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
    // Without cookie-parser, Express does not automatically parse these values : npm install cookie-parser.
    // Because in Node.js/Express, when we use JWT (JSON Web Token) for authentication, we need a way to: 1.Create (sign) JWT tokens.  2.Verify JWT tokens.   3.Decode JWT tokens.  : npm install jsonwebtoekn
