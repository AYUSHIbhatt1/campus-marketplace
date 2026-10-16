const mongoose=require('mongoose');
async function connectdb(){
    try{
 await mongoose.connect(process.env.DATABASE_URL);
    console.log(" Database connected successfully");
    }
   
    catch(error){
         console.error("Database connection failed:", error.message);
    }
}
module.exports=connectdb;