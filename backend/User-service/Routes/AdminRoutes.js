const express= require ('express');
const { updateUser, deleteUser, getAllUsers}= require ('../Controller/UserController');
const {loginAdmin} =require ('../../api-gateway/authService/auth-service.js')

const userRouter=express.Router();

userRouter.post('/LoginAdmin',loginAdmin)
userRouter.delete('/deleteuser', deleteUser)
userRouter.get('/getallusers', getAllUsers)


module.exports=userRouter