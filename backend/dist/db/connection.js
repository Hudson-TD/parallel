import { connect, disconnect } from "mongoose";
export async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
        console.log("DB connection successful");
    }
    catch (error) {
        console.log(error);
        throw new Error("Error connecting to MongoDB");
    }
}
export async function disconnectFromDatabase() {
    try {
        await disconnect();
        console.log("Disconnected from MongoDB");
    }
    catch (error) {
        console.log(error);
        throw new Error("Error disconnecting to MongoDB");
    }
}
//# sourceMappingURL=connection.js.map