import mongoose from "mongoose";

let isConnected = false; // Set to true when connection is established

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	if (!process.env.MONGODB_URI) {
		throw new Error("MONGODB_URI must be defined");
	}

	if (isConnected) return console.log("MongoDB is already connected");

	try {
		await mongoose.connect(process.env.MONGODB_URI);

		isConnected = true;

		console.log("MongoDB connected");
	} catch (error) {
		console.log(error);
	}
};
