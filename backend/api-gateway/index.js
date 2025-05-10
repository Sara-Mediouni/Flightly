const env=require ('dotenv').config();
const express = require('express')
const cors = require('cors')
const app=express();
const port=process.env.PORT
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware'); // Correct import
const helmet = require("helmet");
const { ErrorHandler } = require('./middleware/ErrorHandler');
const {loginAdmin}=require('./authService/auth-service')


app.use(cors())

app.use('/user', createProxyMiddleware({ target: process.env.USER_SERVICE_URL, changeOrigin: true }));
app.use('/flight', createProxyMiddleware({ target: process.env.FLIGHT_SERVICE_URL, changeOrigin: true }));
app.use('/acc', createProxyMiddleware({ target: process.env.ACCOMMODATION, changeOrigin: true }));
app.use('/reserveflight', createProxyMiddleware({ target: process.env.RESERVEFLIGHT, changeOrigin: true }));
app.use('/reserveacc', createProxyMiddleware({ target: process.env.RESERVEACC, changeOrigin: true }));

app.use(morgan('dev'));

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // <--- ici
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "http://localhost:4000"], // autorise les images depuis le gateway
      },
    },
  })
);



app.get("/",(req,res)=>{
res.send("API Working")
})
app.use(ErrorHandler);
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}` )
})