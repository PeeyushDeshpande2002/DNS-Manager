import mongoose from 'mongoose';

const URI ="mongodb://0.0.0.0:27017/DNS_manager"

export const connectDB = async() =>{
    try {
        await mongoose.connect(URI);
        console.log("Successfully connected to DB");
        
    } catch (error) {
        console.error(error, "Connection fails")
        process.exit(0);
    }
}
