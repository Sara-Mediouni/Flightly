const express= require ('express');
const { listOrders,
    placeOrder,
    verifyOrder,
    updateStatus,
    userOrders,
  }= require ('../Controller/ReservationController')


const reserveRouter=express.Router();

reserveRouter.get('/', listOrders)
reserveRouter.post('/order/:userId/:flightId',placeOrder)
reserveRouter.get('/verify/:orderId/:success', verifyOrder)
reserveRouter.put('/update', updateStatus)
reserveRouter.get('/getall/:userId', userOrders)


module.exports=reserveRouter