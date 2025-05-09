const express = require('express');
const router = express.Router();
const {  filterFlights,FlightById, getAllFlights } = require('../Controller/FlightController'); // Ajuste selon ton projet


router.get('/flights', filterFlights);
router.get('/allflights', getAllFlights);

router.get('/:id', FlightById);
module.exports = router;