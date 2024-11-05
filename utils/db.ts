import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.DATABASE_URL!, {});
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;
