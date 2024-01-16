import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import listingRouter from "./routes/listing.route.js"
import path from "path"

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

const __dirname = path.resolve();

const app=express();
app.use(express.json());    // to allow json as the inout of the server

app.use(cookieParser());

app.use("/api/auth",authRouter);  //route for getting user's info
                                // The /api/auth/signup endpoint is a specific route on the server that is designed to handle user signup functionality.


// middleware for error handling, keep it at last so if any error happens anywhere, middleware cathches it

app.use('/api/user', userRouter);
app.use('/api/listing', listingRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})


