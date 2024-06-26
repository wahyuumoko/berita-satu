import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        console.log('CONNECT TO MONGO SUCCESS....')
    } catch (error) {
        console.log('CONNECT TO MONGO FAILED....')
        process.exit(1);
    }
};

export default dbConnect;