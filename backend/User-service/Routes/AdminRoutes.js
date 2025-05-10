const express= require ('express');
const {deleteUser, getAllUsers}= require ('../Controller/UserController');
const {loginAdmin} =require ('../../api-gateway/authService/auth-service.js');
const { authMiddleware } = require('../middleware/auth.js');
const userRouter=express.Router();

userRouter.post('/LoginAdmin',loginAdmin)
userRouter.delete('/deleteuser',authMiddleware, deleteUser)
userRouter.get('/getallusers',authMiddleware, getAllUsers)


module.exports=userRouter