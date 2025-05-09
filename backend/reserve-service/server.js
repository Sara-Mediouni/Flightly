require ('dotenv').config();
const express = require('express')
const cors = require('cors')
const {connectDB} =require ('./db.js');
const path = require('path');
const morgan = require('morgan');
const helmet = require("helmet");
const { ErrorHandler } = require('./middleware/ErrorHandler');

const app=express();
const port=process.env.PORT
const reservRoute=require('./Routes/HotelReservationRoutes.js')
const adminRouter=require('./Routes/AdminRoutes.js')
//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'));

app.use(helmet());
app.use('/resflight',reservRoute)
app.use('/admin',adminRouter)
app.use(ErrorHandler)
connectDB();
app.get("/",(req,res)=>{
res.send("API Working")
})
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}` )
})