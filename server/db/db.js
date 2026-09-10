import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let db = mongoose.connect(
      "mongodb://localhost:27017/library_management",
    );
    mongoose.set("debug", true);
    console.log("mongodb connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB
