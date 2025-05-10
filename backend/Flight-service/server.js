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
const flightRoute=require('./Routes/FlightRoute.js')
const adminRoute=require('./Routes/AdminRoutes.js')
//middleware
app.use(express.json())
app.use(cors())

app.use('/flight',flightRoute)
app.use('/admin',adminRoute)
app.use(morgan('dev'));

app.use(helmet());
connectDB();
app.get("/",(req,res)=>{
res.send("API Working")
})
app.use(ErrorHandler)
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}` )
})