import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from  './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js'
import cors from 'cors'


dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})


const app = express();


const corsOptions = {
    origin: "https://real-estate-frontend-eta.vercel.app",
    credentials:true
  };

app.use(cors(corsOptions))



app.get("/", (req,res)=>{
    res.send("Welcome to the homepage")
})
app.use(express.json());
app.use(cookieParser())

app.use('/api/user' , userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)


const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
    }
);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


