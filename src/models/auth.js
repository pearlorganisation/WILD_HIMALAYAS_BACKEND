import mongoose from "mongoose";
import validator from "validator";

export const authSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: [2, ""],
      maxlength: [18, ""],
      required: [true, "First name is required!!"],
    },
    lastName: {
      type: String,
      minlength: [2, ""],
      maxlength: [18, ""],
      required: [true, "Last name is required!!"],
    },
    number: {
      type: Number,
      required: [true, "Number is required!!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!!"],
      validate: [validator.isEmail, "invalid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required!!"],
    },
    weight: {
      type: Number,
      required: [true, "Weight is required!!"],
    },
    dob: {
      type: String,
      required: ["Dob is required!!"],
    },
    city: {
      type: String,
      required: [true, "city is required!!"],
    },
    height: {
      type: String,
      required: [true, "height is required!!"],
      enum: [
        "3 ' 0''",
        "3 ' 1''",
        "3 ' 2''",
        "3 ' 3''",
        "3 ' 3''",
        "3 ' 4''",
        "3 ' 5''",
        "3 ' 6''",
        "3 ' 7''",
        "3 ' 8''",
        "3 ' 9''",
        "3 ' 10''",
        "3 ' 11''",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Auth", authSchema, "Auth");
