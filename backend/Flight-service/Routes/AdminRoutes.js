const express = require('express');
const router = express.Router();
const { addFlight, deleteFlight,EditFlight} = require('../Controller/FlightController'); // Ajuste selon ton projet
const { authMiddleware } = require('../middleware/auth');


router.post('/flights',authMiddleware, addFlight);


router.delete('/flights/:id',authMiddleware, deleteFlight);


router.put('/edit/:id',authMiddleware, EditFlight);

module.exports = router;