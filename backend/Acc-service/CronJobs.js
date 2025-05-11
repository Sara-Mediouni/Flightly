const cron = require("node-cron");

const Accommodation = require('./Models/Accomodation.js')
cron.schedule("0 0 * * *", async () => {
  const today = new Date();
  
  try {
 

    await Accommodation.updateMany(
        { "offers.endDate": { $lt: today } }, 
        { $set: { offers: null } } 
      );
      console.log("Offres expirées supprimées.");
  
 

    
  
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