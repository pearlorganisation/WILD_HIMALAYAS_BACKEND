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
    },
    region: {
      type: mongoose.Types.ObjectId,
      required: [true, "Region is required!!"],
      ref:"region"
    },
    months: {
      type: [],
      required: [true, "Month is required!!"],
    },
    mapLogo: {
      type: {},
    },
    inclusions: {
      type: [],
      // required: [true, "Inclusion and Exclusion is required !!"],
    },
    exclusions: {
      type: [],
      // required: [true, "Inclusion and Exclusion is required !!"],
    },
    availableDates: [
      { startDate: String, endDate: String ,
        totalSeats:
        {type:Number},
        totalBooked:{
          type:Number,
        default: 0}
        ,vacantSeats:{
          type:Number,
         default: function () {
          return this.totalSeats; // Set vacantSeats to be equal to totalSeats by default
        },
      }}

    ],
    season: {
      type: [],
      required: [true, "Season is required!!"],
    },
  },
  { timestamps: true }

);

// Pre-save middleware to ensure vacantSeats is correctly calculated
tourSchema.pre("save", function (next) {
  this.availableDates.forEach((date) => {
    date.vacantSeats = date.totalSeats - date.totalBooked;
  });
  next();
});

export default mongoose.model("tour", tourSchema);
