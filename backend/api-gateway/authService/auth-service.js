require('dotenv').config(); 
const jwt = require("jsonwebtoken");

const loginAdmin = async (req,res) => {
  const email=req.body.email;
  const password=req.body.password;
  try{

    console.log(process.env.ADMIN_EMAIL)
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
  
    res.status(400).json({success:false, message:"Invalid Credentials"})
  }
  else{
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.status(200).json({success:true,admin:token})}
} catch(error){
  res.status(500).json({success:false,message:"Internal Server Error"})
}
}

module.exports = { loginAdmin };
