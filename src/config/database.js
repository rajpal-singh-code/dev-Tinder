const mongoose = require("mongoose");              //npm i mongoose

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://rajpalku2022:sSkGD3GsUMw2kRC7@cluster11.2a8fnmm.mongodb.net/cluster11"
    );
};

module.exports = connectDB;


