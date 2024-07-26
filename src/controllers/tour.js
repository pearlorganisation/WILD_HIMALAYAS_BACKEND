import { cloudinary } from "../../configs/cloudinary.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import tour from "../models/tour.js";

// / @desc - creating new tour
// @route - POST api/v1/tour

export const newTour = asyncHandler(async (req, res, next) => {

  const { mapLogo,itineraryLogo, banners, gallery } = req?.files;

  const itineraryLogoResult = await cloudinary.uploader.upload(itineraryLogo[0]?.path)
  const mapLogoResult = await cloudinary.uploader.upload(mapLogo[0]?.path)
  const galleryResults = await Promise.all(gallery.map(file => cloudinary.uploader.upload(file.path)));
  const bannersResults = await Promise.all(banners.map(file => cloudinary.uploader.upload(file.path)));

  const newDoc = new tour({
    ...req?.body,
    gallery: galleryResults.map(result => result.secure_url),
    banners: bannersResults.map(result => result.secure_url),
    itineraryLogo: itineraryLogoResult?.secure_url,
    mapLogo: mapLogoResult?.secure_url,
    tripHighlights: JSON.parse(req?.body?.tripHighlights),
    availableDates: JSON.parse(req?.body?.availableDates),
    season: JSON.parse(req?.body?.season),
  });
  await newDoc.save();
  res
    .status(201)
    .json({ status: true, message: "New tour created successfully!!" });
});

// @desc - delete particular tour
// @route - GET api/v1/tour/:id
export const deleteTour = asyncHandler(async (req, res, next) => {
  const isValidId = await tour.findByIdAndDelete(req?.params?.id);
  if (!isValidId)
    return new errorResponse("No Tour found with given id!!", 400);

  res
    .status(200)
    .json({ status: true, message: "Tour deleted successfully!!" });
});

// @desc - get all tours
// @route - GET api/v1/tour

export const getAllTours = asyncHandler(async (req, res, next) => {
  const data = await tour.find().populate("activity");
  res.status(200).json({
    status: true,
    message:
      data?.length >= 1 ? "data found successfully!!" : "No data found!!",
    data,
  });
});
