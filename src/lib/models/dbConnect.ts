import mongoose from "mongoose";


const dbConnect = async() => {
try {
   await mongoose.connect(process.env.MONGODB_URI!)
} catch (error){
    throw new Error ("Connection failed" + error)
}
}
export default dbConnect