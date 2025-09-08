const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const User_Safe_Data = " firstName lastName age gender about skills ";

userRouter.get("/user/requests/received", userAuth, async(req,res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", User_Safe_Data );   // this line give the from Schema.
        // }).populate("fromUserId", ["firstName","lastName"]);   

        res.json({
            message: "Data fetched successfully",
            data: connectionRequest,
        });
    } catch(err) {
        req.statusCode(400).send("ERROR: "+ err.message);
    }
});

userRouter.get("/user/connections", userAuth, async(req,res) => {  // it will show the data after accept or connect
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ],
        }).populate("fromUserId", User_Safe_Data)
          .populate("toUserId", User_Safe_Data);
        

        const data = connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString())
                return row.toUserId;
            return row.fromUserId;
        });

        res.json({ data });
    } catch(err) {
        res.status(400).send({ message: err.message });
    }
})


module.exports = userRouter;


// ref:"User"   it is create the connection to DB and .populate("fromUserId") you can take any date necessary data