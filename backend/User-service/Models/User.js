const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    phone:{type:String, required:true},
    address:{type:String, required:true},
    city:{type:String, required:true},
    country:{type:String, required:true},
    dateOfBirth:{type:String, required
:true},

    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
},{minimize:false})

const userModel= mongoose.models.user || mongoose.model("user",userSchema)
module.exports=userModel