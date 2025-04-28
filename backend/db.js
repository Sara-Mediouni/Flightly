const mongoose=require ("mongoose")

const connectDB=async()=>{
  await mongoose.connect("mongodb+srv://sarahmediouni4:JFCIoZiYbavivnNr@cluster0.zdz9o8e.mongodb.net/Flightly?retryWrites=true&w=majority&appName=Cluster0")
  .then(()=>
  console.log("DB connected"));
}
module.exports={connectDB}