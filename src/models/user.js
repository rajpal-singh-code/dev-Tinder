const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address: "+ value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)) {
                throw new Error("this is not strong password : "+ value);
            }
        }
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        enum: {
            values: ["male","female", "other"],
            message: `{VALUE} is not a valid gender type`,
        },
        // validate(value){
        //     if(!["male", "female","ohers"].includes(value)){
        //         throw new Error("Gender data is not valid");
        //     }
        // },
    },
    phoneNo: {
        type: Number
    },
    photoUrl: {
        type: String,
        default: "https://www.shutterstock.com/image-photo/blond-hair-girl-taking-photo-260nw-2492842415.jpg",
        validate(value){
            if(!validator.isURL(value)) {
                throw new Error("Invalid URL address: "+ value);
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of the user!",
    },
    skills: {
        type: [String],
    },
}, {
    timestamps: true,
})

// UserSchema.index({ firstName: 1 });  // if you want to do indexing the database then it will need it.  but db need lots of work for this that's why not use necessary

UserSchema.methods.getJWT = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id}, "DEV@Tinder$798", {expiresIn: "7d",});

    return token;
}

UserSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);

    return isPasswordValid;
}

module.exports = mongoose.model("User", UserSchema); 

// (This) keyword does not work with arrow function 