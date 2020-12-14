import mongoose from "mongoose";
import { MONGO_URI } from "../config";

export default async () => {
  try {
    mongoose.connect(MONGO_URI, {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
