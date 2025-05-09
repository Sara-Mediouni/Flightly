const express= require ('express');
const { 
    listOrders
  }= require ('../Controller/ReserveRoomsController')


const adminRouter=express.Router();

adminRouter.get('/', listOrders)



module.exports=adminRouter