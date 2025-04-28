const express = require('express')
const cors = require('cors')
const {connectDB} =require ('./db.js');
const path = require('path');
const userRouter = require ('./Routes/UserRoute.js');
const flightRouter = require ('./Routes/FlightRoute.js');
const accRouter = require ('./Routes/AccomodationRoute.js');

const env=require ('dotenv/config');
const reserveRouter = require('./Routes/ReservationRoutes.js');
const reservehotelRouter = require('./Routes/HotelReservationRoutes.js');
//app config
const app=express();
const port=4000

//middleware
app.use(express.json())
app.use(cors())

connectDB();

app.use('/uploads', express.static('uploads'));
app.use('/api/reserver',reserveRouter)
app.use('/api/reserveracc',reservehotelRouter)
app.use('/api/user',userRouter)
app.use('/api/flight',flightRouter)
app.use('/api/accommodation',accRouter)

app.get("/",(req,res)=>{
res.send("API Working")
})
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}` )
})