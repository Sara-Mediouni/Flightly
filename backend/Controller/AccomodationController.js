const Accommodation = require('../Models/Accomodation');
const mongoose = require('mongoose');
const Offer = require('../Models/Offer');
const fs = require("fs");
const path = require("path");
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const addAccommodation = async (req, res) => {
  try {
    const { accommodationData, roomsData, offerData } = req.body;
    const { accommodationImages = [], roomImages = [] } = req.files || {};

    if (!accommodationData || !roomsData) {
      return res.status(400).json({ message: "accommodationData and roomsData are required" });
    }

    const accommodation = typeof accommodationData === 'string' ? JSON.parse(accommodationData) : accommodationData;
    const rooms = typeof roomsData === 'string' ? JSON.parse(roomsData) : roomsData;
    const offer = offerData ? (typeof offerData === 'string' ? JSON.parse(offerData) : offerData) : null;

    const accommodationImagePaths = accommodationImages.map(file => `/uploads/${file.filename}`);
    const roomImagePaths = roomImages.map(file => `/uploads/${file.filename}`);

    let savedOffer = null;
    if (offer && Object.keys(offer).length > 0) {
      savedOffer = await new Offer(offer).save();
    }

    let imageIndex = 0;
    const roomsWithImages = rooms.map(room => {
      const count = room.RoomImagesCount || 0;
      const images = roomImagePaths.slice(imageIndex, imageIndex + count);
      imageIndex += count;
      return {
        ...room,
        roomImages: images
      };
    });

    const newAccommodation = new Accommodation({
      ...accommodation,
      images: accommodationImagePaths,
      roomTypes: roomsWithImages,
      offers: savedOffer ? savedOffer._id : null
    });

    await newAccommodation.save();

    res.status(201).json({ message: 'Accommodation and offer added successfully', accommodation: newAccommodation });
  } catch (err) {
    console.error('Error adding accommodation:', err);
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: 'Validation error', errors: err.errors });
    }
    res.status(500).json({ message: 'Error adding accommodation', error: err });
  }
};
const editAccommodation = async (req, res) => {
  try {
    const accommodationId = req.params.id;

    if (!isValidObjectId(accommodationId)) {
      return res.status(400).json({ message: 'Invalid accommodation ID' });
    }

    const { accommodationData, roomsData, offerData } = req.body;
    const { uploadedImages = [], roomImages = [] } = req.files || {};

    const existingAccommodation = await Accommodation.findById(accommodationId);
    if (!existingAccommodation) return res.status(404).json({ message: 'Accommodation not found' });

    const existingImages = req.body.existingImages || [];
    const oldImages = Array.isArray(existingImages) ? existingImages : [existingImages];
    const newImagePaths = uploadedImages.map(file => `/uploads/${file.filename}`);
    const allImages = [...oldImages, ...newImagePaths];

    const accommodation = typeof accommodationData === 'string' ? JSON.parse(accommodationData) : accommodationData;
    const rooms = typeof roomsData === 'string' ? JSON.parse(roomsData) : roomsData;
    const offer = offerData ? (typeof offerData === 'string' ? JSON.parse(offerData) : offerData) : null;

    const roomImagePaths = roomImages.map(file => `/uploads/${file.filename}`);

    let updatedOffer;
    if (offer && Object.keys(offer).length > 0 && Object.values(offer).some(v => v !== "" && v !== null && v !== undefined)) {
      if (existingAccommodation.offers) {
        updatedOffer = await Offer.findByIdAndUpdate(existingAccommodation.offers, offer, { new: true });
      } else {
        updatedOffer = await new Offer(offer).save();
      }
    }

    let imageIndex = 0;
    const roomsWithImages = rooms.map(room => {
      const count = room.RoomImagesCount || 0;
      const images = roomImagePaths.slice(imageIndex, imageIndex + count);
      imageIndex += count;
      return {
        ...room,
        roomImages: images
      };
    });

    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      accommodationId,
      {
        ...accommodation,
        images: allImages,
        roomTypes: roomsWithImages,
        offers: updatedOffer ? updatedOffer._id : existingAccommodation.offers
      },
      { new: true }
    );

    res.status(200).json({ message: 'Accommodation updated successfully', accommodation: updatedAccommodation });
  } catch (err) {
    console.error('Error updating accommodation:', err);
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: 'Validation error', errors: err.errors });
    }
    res.status(500).json({ message: 'Error updating accommodation', error: err });
  }
};

const deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndDelete(req.params.id);
    if (!accommodation) return res.status(404).json({ message: 'Accommodation not found' });
    res.status(200).json({ message: 'Accommodation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting accommodation', error: err });
  }
};

const filterAccommodations = async (req, res) => {
  const { type, country, name } = req.query;

  let query = {};
  if (type) query.type = type;
  if (country) query.country = { $regex: country, $options: "i" }; // recherche insensible à la casse
  if (name) query.name = { $regex: name, $options: "i" };

  try {
    const accommodations = await Accommodation.find(query);
    res.json(accommodations);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id).populate('offers');
    if (!accommodation) return res.status(404).json({ message: 'Accommodation not found' });
    res.status(200).json(accommodation);
  } catch (err) {
    res.status(500).json({ message: 'Error getting accommodation', error: err });
  }
};

const getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find().populate('offers');
    res.status(200).json(accommodations);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving accommodations', error: err });
  }
};

const getRoomPricesByDate = async (req, res) => {
  const { hotelId } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const accommodation = await Accommodation.findById(hotelId);
    if (!accommodation) return res.status(404).json({ message: 'Accommodation not found' });

    const start = new Date(startDate);
    const end = new Date(endDate);

    const roomsWithDynamicPricing = accommodation.roomTypes.map(room => {
      const seasonalPricing = room.pricingByDate.find(season => {
        const seasonStart = new Date(season.StartDate);
        const seasonEnd = new Date(season.EndDate);
        return (
          (start >= seasonStart && start <= seasonEnd) ||
          (end >= seasonStart && end <= seasonEnd) ||
          (start <= seasonStart && end >= seasonEnd)
        );
      });

      return {
        name: room.name,
        basePrice: room.price,
        dynamicPrice: seasonalPricing ? seasonalPricing.price : room.price,
        ...room.toObject()
      };
    });

    res.status(200).json(roomsWithDynamicPricing);
  } catch (err) {
    res.status(500).json({ message: 'Error getting room prices', error: err });
  }
};
const deleteRoomImage=async (req, res) => {
  const id = req.params.id;
  const {  roomIndex, imagePath } = req.body;

  try {
    // Récupération du document
    const accommodation = await Accommodation.findById(id);
    if (!accommodation) return res.status(404).json({ message: "Not found" });

    // Supprimer du tableau d'images dans MongoDB
    accommodation.roomTypes[roomIndex].roomImages = accommodation.roomTypes[roomIndex].roomImages.filter(
      (img) => img !== imagePath
    );

    await accommodation.save();
    console.log("Image supprimée de MongoDB avec succès");
    // Supprimer le fichier physique
    const filePath = path.join(__dirname, "../public", imagePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({ message: "Image supprimée avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur suppression image", error: err });
  }
}
const deleteImage=async (req, res) => {
  const id = req.params.id;
  const  {imagePath}  = req.body;

  try {
    // Récupération du document
    const accommodation = await Accommodation.findById(id);
    if (!accommodation) return res.status(404).json({ message: "Not found" });

    // Supprimer du tableau d'images dans MongoDB
    accommodation.images = accommodation.images.filter(
      (img) => img !== imagePath
    );

    await accommodation.save();
    console.log("Image supprimée de MongoDB avec succès");
    // Supprimer le fichier physique
    const filePath = path.join(__dirname, "../public", imagePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({ message: "Image supprimée avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur suppression image", error: err });
  }
}
module.exports = {
  addAccommodation,
  deleteRoomImage,
  deleteAccommodation,
  filterAccommodations,
  getAccommodationById,
  getAllAccommodations,
  getRoomPricesByDate,
  editAccommodation,
  deleteImage
};
