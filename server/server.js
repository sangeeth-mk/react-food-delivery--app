import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import MONGO_URL from './config/Database.js';
import foodRoutes from './routes/routes.js';
import userRouter from './routes/userRoutes.js';
import 'dotenv/config.js'
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api',foodRoutes)
app.use("/uploads",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

const PORT = process.env.PORT ;
app.listen(PORT,()=>{
    console.log(`app is running at http://localhost:${PORT}`)
})

mongoose.connect(MONGO_URL)
.then(()=>console.log("Database Connected"))
.catch((err)=>console.log("couldnt connect to database",err))
