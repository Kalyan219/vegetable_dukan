import mongoose from 'mongoose';

export async function mongoDbConnection() {
    try {
        const uri = "mongodb+srv://kalyansurla219:1IDEoGN1KvK1oIzk@vegtabledukancluster1.xj9w1.mongodb.net/";
        await mongoose.connect(uri);
        console.log("mongo db connected");
        const db = mongoose.connection.useDb("vegetable_dukan");
        const user_details = db.collection("user_details");
        const vegetableData_collection = db.collection("vegetableData_collection");
        return {user_details, vegetableData_collection};
    } catch(error){
        console.log(error);
    }
}