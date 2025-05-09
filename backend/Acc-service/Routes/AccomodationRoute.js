const express = require('express');
const router = express.Router();
const multer = require('multer');
const { filterAccommodations, getAllAccommodations, getAccommodationById, getRoomPricesByDate } = require('../Controller/AccomodationController');



router.get('/', filterAccommodations);
router.get('/all', getAllAccommodations);
router.get('/:id', getAccommodationById);

router.get('/roomPrices/:hotelId', getRoomPricesByDate);




module.exports = router;
