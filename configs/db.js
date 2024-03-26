import chalk from "chalk";
import mongoose from "mongoose";

// mongoConnect - function to connect the mongo database of the provided mongo url string
export const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      chalk.bold.white.underline(
        "Mongo Database Connection Successful!!                                                                           "
      )
    );
  } catch (e) {
    console.log(
      e?.message
        ? `Mongo Database Connection Failed-${e?.message}`
        : `Mongo Database Connection Failed`
    );
  }
};
