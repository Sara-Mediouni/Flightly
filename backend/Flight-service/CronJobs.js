const cron = require("node-cron");
const Flight  = require("./Models/Flight")

cron.schedule("0 0 * * *", async () => {
  const today = new Date();
  
  try {

    await Flight.deleteMany({ returnDate: { $lt: today } });
    console.log("Vols dépassés supprimés.");

 
   
    } catch (err) {
      console.error("Erreur lors de la suppression : ", err);
    }
  });