const cron = require("node-cron");
const { Flight } = require("./Models/Flight"); // Modèle pour les vols
const { Accommodation } = require("./Models/Accommodation"); // Modèle pour les saisons d'hôtels

// Planifie une tâche qui s'exécute tous les jours à minuit
cron.schedule("0 0 * * *", async () => {
  const today = new Date();
  
  try {
    // Supprimer les vols dont la date de retour est passée
    await Flight.deleteMany({ returnDate: { $lt: today } });
    console.log("Vols dépassés supprimés.");

    await Accommodation.updateMany(
        { "offers.endDate": { $lt: today } }, // Trouve les offres expirées
        { $set: { offers: null } } // Annule les offres expirées
      );
      console.log("Offres expirées supprimées.");
  
 
      // Supprimer les saisons d'hôtels passées dans chaque roomType
    
  
      await Accommodation.updateMany(
        {},
        {
          $pull: {
            "roomTypes.$[].pricingByDate": { EndDate: { $lt: today } }
          }
        }
      );
      console.log("Saisons expirées supprimées.");
    } catch (err) {
      console.error("Erreur lors de la suppression : ", err);
    }
  });