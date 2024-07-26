import mongoose, { Schema } from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: [true, "Price is Required"],
    },
    gallery: {
      type: [],
      required: [true, "Gallery is required"],
    },
    banners: {
      type: [],
      required: [true, "Banners is required"],
    },
    bannerDescription: {
      type: String,
      required: [true, "Banner Description is required!!"],
    },
    title: {
      type: String,
      required: [true, "Title is Required"],
    },
    activity: {
      type: mongoose.Types.ObjectId,
      ref: "activity",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Description is Required"],
    },
    tripDuration: {
      type: Number,
      required: [true, "Duration is Required"],
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty is Required"],
    },
    highestPoint: {
      type: String,
      required: [true, "Highest Point is Required"],
    },
    tripHighlights: {
      type: [],
      required: [true, "Highlights is required"],
    },
    itinerary: {
      type: String,
      required: [true, "Itinerary is required!!"],
    },
    itineraryLogo: {
      type: String,
      required: [true, "Itinerary Logo is required!!"],
    },
    mapLogo: {
      type: String,
      required: [true, "Map Logo is required !!"],
    },
    inclusionsAndExclusions: {
      type: String,
      required: [true, "Inclusion and Exclusion is required !!"],
    },
    availableDates: [{ startDate: String, endDate: String ,vacant:Number,}],
    season: {
      type: [],
      required: [true, "Season is required!!"],
    },
  },
  { timestamps: true }

);

export default mongoose.model("tour", tourSchema);
