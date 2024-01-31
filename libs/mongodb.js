import mongoose from "mongoose";

export const connectMongoDB = async () => {
    if (mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
});
        console.log("Connected");
    } catch (error) {
        console.log(error);
    }
    
};

// export default connectMongoDB;