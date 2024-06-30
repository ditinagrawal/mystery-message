import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number;
}

const connection: connectionObject = {}

const connectDB = async (): Promise<void> => {
    if (connection.isConnected) {
        console.log("Database is already connected");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI!)
        connection.isConnected = db.connections[0].readyState;
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to database", error);
        process.exit(1);
    }
}

export default connectDB;