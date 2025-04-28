const  userModel=require ("../Models/User");
const  jwt =require ('jsonwebtoken');
const bcrypt =require ('bcrypt');
const validator =require ('validator');


//login user
const loginUser = async (req, res)=>{
    const {email, password}=req.body;
    try{
      const user= await userModel.findOne({email});
    if (!user){
        return res.json({success:false, message:"User doesn't exist"})
    }
     

    const isMatch=await bcrypt.compare(password, user.password);
    if (!isMatch){
        return res.json({success:false,message:"Invalid credentials" })
    }
    const token= createToken(user._id);
    res.json({success:true, message:"Welcome Back",token})
    }
    catch(error){
      console.log(error);
      res.json({success:false, message:"Error"})
    }

}
const createToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}
//register user
const registerUser = async (req, res)=>{
    const { email, password, firstname, lastname, dateOfBirth,
        phone, address, city, country}=req.body;
    try{
        //checking is user already exists
        const exists=await userModel.findOne({
            email
        });
        if (exists){
            return res.json({success:false, message:"User already exists"})
        }
        //validating email format & strong password 
    if (!validator.isEmail(email)){
        return res.json({success:false, message:"Please enter a valid email"})
    }
    if (password.length<8){
        return res.json({success:false, message: "Please enter a strong password"})
    }
    //hashing user password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password, salt);
    const newUser=new userModel({
        
        email:email,
        password:hashedPassword,
        firstname:firstname,
        lastname:lastname,
        phone:phone,
        address:address,
        city:city,
        country:country,
        dateOfBirth:dateOfBirth


    })
    const user=await newUser.save()
    const token =createToken(user._id)
    res.json({success:true,message:"Account Created", token})
}
    
    catch (error){
       console.log(error);
       res.json({success:false, error})
    }
}
const getUser=async (req, res)=>{
    const {id}=req.params;
    try{
        const user=await userModel.findById(id).select("-password -__v")
        if (!user){
            return res.json({success:false, message:"User not found"})
        }
        res.json({success:true, user})
    }
    catch (error){
        console.log(error);
        res.json({success:false, error})
    }
}
const updateUser=async (req, res)=>{
    const {id}=req.params;
    try{
        const user=await userModel.findById(id).select("-password -__v")
        if (!user){
            return res.json({success:false, message:"User not found"})
        }
        //validating email format & strong password 
        else{
        const updatedUser=await userModel.findByIdAndUpdate(id, req.body, {new:true}).select("-password -__v")
        res.json({success:true, updatedUser})
    }}
    catch (error){
        console.log(error);
        res.json({success:false, error})
    }
}
const deleteUser=async (req, res)=>{
    const {id}=req.user;
    try{
        const user=await
    userModel.findById(id).select("-password -__v")
        if (!user){
            return res.json({success:false, message:"User not found"})
        }
        await userModel.findByIdAndDelete(id)
        res.json({success:true, message:"User deleted successfully"})
    }
    catch (error){
        console.log(error);
        res.json({success:false, error})
    }
}
const getAllUsers=async (req, res)=>{
    try{
        const users=await userModel.find().select("-password -__v")
        if (!users){
            return res.json({success:false, message:"No users found"})
        }
        res.json({success:true, users})
    }
    catch (error){
        console.log(error);
        res.json({success:false, error})
    }
}

module.exports={loginUser, registerUser, getUser, updateUser, deleteUser, getAllUsers}