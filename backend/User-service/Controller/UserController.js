const  userModel=require ("../Models/User");
const  jwt =require ('jsonwebtoken');
const bcrypt =require ('bcrypt');
const validator =require ('validator');


//login user
const loginUser = async (req, res)=>{
    const {email, password}=req.body;
    try{
      const user= await userModel.findOne({email:email});
    if (!user){
        return res.status(404).json({success:false, message:"User doesn't exist"})
    }
     

    const isMatch=await bcrypt.compare(password, user.password);
    if (!isMatch){
        return res.status(404).json({success:false,message:"Invalid credentials" })
    }
    const token= createToken(user._id);
    res.status(200).json({success:true, message:"Welcome Back",token})
    }
    catch(error){
      console.log(error);
      res.status(500).json({success:false, message:"Error"})
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
        
        const exists=await userModel.findOne({
            email:email
        });
        if (exists){
        return res.status(400).json({success:false, message:"User already exists"})
        }
        if (!validator.isEmail(email)){
        return res.status(400).json({success:false, message:"Please enter a valid email"})
        }
        if (password.length<8){
        return res.status(400).json({success:false, message: "Please enter a strong password"})
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
    res.status(200).json({success:true,message:"Account Created", token})
}
    
    catch (error){
       console.log(error);
       res.status(500).json({success:false, error})
    }
}
const getUser=async (req, res)=>{
    const {id}=req.params;
    try{
        const user=await userModel.findById(id)
        if (!user){
            return res.status(404).json({success:false, message:"User not found"})
        }
        res.status(200).json({success:true, user})
    }
    catch (error){
        console.log(error);
        res.status(500).json({success:false, error})
    }
}
const updateUser=async (req, res)=>{
    const {id}=req.params;
    try{
        const updatedUser=await userModel.findByIdAndUpdate(id, req.body, {new:true});
        if (!updatedUser){
            return res.status(404).json({success:false, message:"User not found"})
        }
        
        else{
        
        return res.status(200).json({success:true, updatedUser})
    }}
    catch (error){
        console.log(error);
        return res.status(500).json({success:false, error})
    }
}
const deleteUser=async (req, res)=>{
    const {id}=req.body;
    try{
        const user=await
    userModel.findByIdAndDelete(id);
    console.log(user)
        if (!user){
            return res.status(404).json({success:false, message:"User not found"})
        }
        
        return res.status(200).json({success:true, message:"User deleted successfully"})
    }
    catch (error){
        console.log(error);
        return res.status(500).json({success:false, error})
    }
}
const getAllUsers=async (req, res)=>{
    try{
        const users=await userModel.find();
        if (!users){
            return res.status(404).json({success:false, message:"No users found"})
        }
        return res.status(200).json({success:true, users})
    }
    catch (error){
        console.log(error);
       return res.status(500).json({success:false, error})
    }
}

module.exports={loginUser, createToken,registerUser, getUser, updateUser, deleteUser, getAllUsers}