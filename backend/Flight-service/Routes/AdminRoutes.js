const express = require('express');
const router = express.Router();
const { addFlight, deleteFlight,EditFlight} = require('../Controller/FlightController'); // Ajuste selon ton projet


router.post('/flights', addFlight);


router.delete('/flights/:id', deleteFlight);


router.put('/edit/:id', EditFlight);

module.exports = router;