const express= require ('express');
const {loginUser, registerUser,getUser}= require ('../Controller/UserController')


const userRouter=express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/getuser/:id', getUser)

userRouter.put('/updateuser/:id', updateUser)

module.exports=userRouter