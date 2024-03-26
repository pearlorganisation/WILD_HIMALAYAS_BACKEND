import mongoose from "mongoose";

const trekSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Trek name is required!!"] },
    trekTitle: {
      type: String,
      required: [true, "Trek title is required!!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!!"],
    },
    season: {
      type: String,
      required: [true, "Trek season is required!!"],
      enum: ["winter", "pre-winter", "autumn", "monsoon", "spring", "summer"],
    },
    price: {
      type: Number,
      required: [true, "Price is required!!"],
    },
    difficulty: {
      type: String,
      required: [true, "Trek difficulty level is required!!"],
    },
    duration: {
      type: Number,
      required: [true, "Trek duration is required!!"],
    },
    altitude: {
      type: Number,
      required: [true, "Trek altitude is required!!"],
    },
    ageLimit: {
      type: String,
      required: [true, "Trek age limit is required!!"],
    },
    gallery: {
      type: [],
      required: [true, "Trek gallery is required!!"],
    },
    banners: {
      type: [],
      required: [true, "Trek banners is required!!"],
    },
    trekLogo: {
      type: String,
      required: [true, "Trek logo is required!!"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Trek", trekSchema, "Trek");
