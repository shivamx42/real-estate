import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/error.js';
import jwt from "jsonwebtoken";

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


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });  // checks for the user with email provided
      if (!validUser) return next(errorHandler(404, 'User not found!'));  // customised error message using utils/error
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };