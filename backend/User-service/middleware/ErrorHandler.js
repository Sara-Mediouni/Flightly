const express=require("express")
const app=express()
const ErrorHandler=async (err,req,res,next)=>{
  console.error(err.stack);
  res.status(err.stack || 500).json({
    message: err.message || "Internal Server Error",
  })
}
module.exports={ErrorHandler}