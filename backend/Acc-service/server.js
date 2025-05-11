require ('dotenv').config();
const express = require('express')
const cors = require('cors')
const {connectDB} =require ('./db.js');
const path = require('path');
const morgan = require('morgan');
const { ErrorHandler } = require('./middleware/ErrorHandler');

const app=express();
const port=process.env.PORT
const AccRoute=require('./Routes/AccomodationRoute.js')
const adminRoute=require('./Routes/AdminRoutes.js')
app.use(morgan('dev'));


app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin'); // optionnel
  res.setHeader('Content-Security-Policy', "img-src * data:;"); // assoupli pour dev
  next();
});
app.use('/acc',AccRoute)
app.use('/admin',adminRoute)
app.use('/uploads', express.static('uploads'));
app.use(ErrorHandler)

connectDB();
app.get("/",(req,res)=>{
res.send("API Working")
})
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}` )
})