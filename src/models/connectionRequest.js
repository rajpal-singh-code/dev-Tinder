const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        status: {
            type: String,
            enum: {
                values: ["ignore", "interested", "accepeted","rejected"],
                message: `{VALUE} IS INCORRECT STATUS TYPE`,
            },
        },
    },
    {
        timestamps: true,
    }
);