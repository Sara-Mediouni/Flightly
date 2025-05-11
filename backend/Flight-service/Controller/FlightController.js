  // Importer ton modèle

const flight = require("../Models/Flight");

// Fonction pour ajouter un vol
const addFlight = async (req, res) => {
  
 const flightData = req.body.flightData;
  try {

    
    const Flight=await flight.findOne({flightNumber:flightData.flightNumber});
    if (!Flight)
   { console.log(flightData); // Récupérer les données envoyées dans le corps de la requête
    const flightAdded = new flight(flightData); // Créer un nouvel objet de vol avec les données
    
    await flightAdded.save();
    console.log('flight:',flightAdded) // Sauvegarder le vol dans la base de données
    res.status(201).json({ message: 'Vol ajouté avec succès', flight:flightAdded });}
    else {
    res.status(400).json({ message: 'Un Vol avec ce numéro existe déjà' })}

    }
   catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erreur lors de l\'ajout du vol', error });
  }
};



const deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFlight = await flight.findByIdAndDelete(id);

    if (!deletedFlight) {
      return res.status(404).json({ message: 'Vol non trouvé' });
    }

    res.status(200).json({ message: 'Vol supprimé avec succès' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du vol', error });
  }
};

  // Fonction pour filtrer les vols
  const filterFlights = async (req, res) => {
    try {
      const { from, to, departureDate, returnDate, classType, passengers, type } = req.query;
  
      let filter = {};
  
      if (from !== "") {
        filter.from = from;
      }
      if (to !== "") {
        filter.to = to;
      }
      if (departureDate !== "") {
        filter.departureDate = { $gte: new Date(departureDate) };
      }
      if (returnDate !== "") {
        filter.returnDate = { $lte: new Date(returnDate) };
      }
      if (type !== "") {
        filter.flightType = type;
      }
  
      if (classType !== "" && passengers !== "") {
        filter.classes = {
          $elemMatch: {
            name: classType,
            availableSeats: { $gte: parseInt(passengers) }
          }
        };
      } else if (classType !== "") {
        filter.classes = {
          $elemMatch: {
            name: classType
          }
        };
      } else if (passengers !== "") {
        filter.classes = {
          $elemMatch: {
            availableSeats: { $gte: parseInt(passengers) }
          }
        };
      }
  
      const flights = await flight.find(filter);
  
      if (flights.length === 0) {
        return res.status(404).json({ message: 'Aucun vol trouvé avec ces filtres' });
      }
  
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la recherche des vols', error });
    }
  };
  
  const getAllFlights=async(req, res)=>{
    try{
     const flights=await flight.find();
     return res.status(200).json(flights)
    }
    catch(error){
      res.status(500).json({ message: 'Erreur lors de la recherche des vols', error });
    }
  }
  const EditFlight=async(req, res)=>{
    try{
      const { id } = req.params;
      const flightData = req.body.flightData;
      const updatedFlight = await flight.findByIdAndUpdate(id, flightData, { new: true });
  
      if (!updatedFlight) {
        return res.status(404).json({ message: 'Vol non trouvé' });
      }
  
      res.status(200).json({ message: 'Vol mis à jour avec succès', updatedFlight });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour du vol', error });
    }
  };
  const FlightById=async(req, res)=>{
    try {
      const { id } = req.params;
      const flightData = await flight.findById(id);

      if (!flightData) {
        return res.status(404).json({ message: 'Vol non trouvé' });
      }

      res.status(200).json(flightData);
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erreur lors de la récupération du vol', error });
    }
  }
module.exports={addFlight, deleteFlight, filterFlights,EditFlight, getAllFlights,FlightById}