const express= require ('express');
const { listOrders

  }= require ('../Controller/ReservationController')


const adminRouter=express.Router();

adminRouter.get('/', listOrders)



module.exports=adminRouter