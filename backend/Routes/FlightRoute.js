const express = require('express');
const router = express.Router();
const { addFlight, deleteFlight, filterFlights,FlightById,EditFlight, getAllFlights } = require('../Controller/FlightController'); // Ajuste selon ton projet

// Route pour ajouter un vol
router.post('/flights', addFlight);

// Route pour supprimer un vol par ID
router.delete('/flights/:id', deleteFlight);

// Route pour filtrer les vols
router.get('/flights', filterFlights);
router.get('/allflights', getAllFlights);
router.put('/edit/:id', EditFlight);
router.get('/:id', FlightById);
module.exports = router;