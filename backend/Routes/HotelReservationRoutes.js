const express= require ('express');
const { 
    listOrders,
    placeOrder,
    verifyOrder,
    updateStatus,
    userOrders,
  }= require ('../Controller/ReserveRoomsController')


const reservehotelRouter=express.Router();

reservehotelRouter.get('/', listOrders)
reservehotelRouter.post('/order/:userId/:accId',placeOrder)
reservehotelRouter.get('/verify/:orderId/:success', verifyOrder)
reservehotelRouter.put('/update', updateStatus)
reservehotelRouter.get('/getall/:userId', userOrders)


module.exports=reservehotelRouter