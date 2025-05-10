const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addAccommodation, filterAccommodations,editAccommodation, getAllAccommodations, getAccommodationById, deleteAccommodation, getRoomPricesByDate, deleteRoomImage, deleteImage } = require('../Controller/AccomodationController')
const path=require('path')
const {authMiddleware}=require ('../middleware/auth')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => cb(null, `${file.originalname}`),
});

const upload = multer({ storage: storage });

router.post(
  '/create',
  upload.fields([{ name: 'accommodationImages' }, { name: 'roomImages' }]),
  authMiddleware,addAccommodation
);

router.delete('/:id',authMiddleware, deleteAccommodation);

router.put(
  '/edit/:id',
  upload.fields([{ name: 'uploadedImages' }, { name: 'roomImages' }]),authMiddleware,
  editAccommodation
);

router.delete("/room-image/:id",authMiddleware,deleteRoomImage);
router.delete("/image/:id",authMiddleware,deleteImage);


module.exports = router;
