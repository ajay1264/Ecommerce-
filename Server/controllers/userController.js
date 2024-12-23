import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from "bcryptjs"
import createToken from "../utils/createToken.js"
import generateToken from '../utils/createToken.js';


const createUser = asyncHandler(async (req, res) => {
   const {username, email, password } = req.body

   if (!username || !email || !password) {
    throw new Error("Please fill all the inputs")
   }
   
   const userExists = await User.findOne({email})
   if (userExists) { res.status(400).send("User Already exists");
   }

// using bcrypt for passwords 
const salt = await bcrypt.genSalt(8)
const hashedPassword = await bcrypt.hash(password, salt)

// creating new user
   const newUser = new User({username, email, password: hashedPassword })

   try {
    await newUser.save()
    createToken(res, newUser._id);

    res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,

    })
   } catch (error) {
    res.status(400)
    throw new Error("Invalid user data")
   }


});

export {createUser};