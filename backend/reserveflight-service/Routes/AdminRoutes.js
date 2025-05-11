const express= require ('express');
const { listOrders

  }= require ('../Controller/ReservationController');
const { authMiddleware } = require('../middleware/auth');


const adminRouter=express.Router();

adminRouter.get('/',authMiddleware, listOrders)



module.exports=adminRouter