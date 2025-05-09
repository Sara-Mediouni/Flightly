const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addAccommodation, filterAccommodations,editAccommodation, getAllAccommodations, getAccommodationById, deleteAccommodation, getRoomPricesByDate, deleteRoomImage, deleteImage } = require('../Controller/AccomodationController');


// Configuration multer
const upload = multer({ dest: 'uploads/' });

router.post(
  '/create',
  upload.fields([{ name: 'accommodationImages' }, { name: 'roomImages' }]),
  addAccommodation
);

router.delete('/:id', deleteAccommodation);

router.put(
  '/edit/:id',
  upload.fields([{ name: 'uploadedImages' }, { name: 'roomImages' }]),
  editAccommodation
);

router.delete("/room-image/:id",deleteRoomImage);
router.delete("/image/:id",deleteImage);


module.exports = router;
