import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;   // get user's details
    const hashedPassword=bcryptjs.hashSync(password,10);

    const newUser=new User({username,email,password: hashedPassword});
    
    try {

        await newUser.save();    // to save the user's details in the database

        res.status(201).json("User created successfully");

    } catch (error) {
        next(error);    // sends the error to the next middleware
    }
}