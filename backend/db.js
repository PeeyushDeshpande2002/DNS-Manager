import mongoose from 'mongoose';

const URI ="mongodb+srv://deshppd2002:tHmv27wj4SKspHGq@dns-manager.0trjfrw.mongodb.net/"

export const connectDB = async() =>{
    try {
        await mongoose.connect(URI);
        console.log("Successfully connected to DB");
        
    } catch (error) {
        console.error(error, "Connection fails")
        process.exit(0);
    }
}
