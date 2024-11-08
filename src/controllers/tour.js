import { isValidObjectId } from "mongoose";
import { cloudinary } from "../../configs/cloudinary.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import tour from "../models/tour.js";

// / @desc - creating new tour
// @route - POST api/v1/tour

export const newTour = asyncHandler(async (req, res, next) => {

  const { mapLogo, banners, gallery } = req?.files;

  let mapLogoResult = null;
if (mapLogo && mapLogo[0]) {
  mapLogoResult = await cloudinary.uploader.upload(mapLogo[0].path);
}
  const galleryResults = await Promise.all(gallery.map(file => cloudinary.uploader.upload(file.path)));
  const bannersResults = await Promise.all(banners.map(file => cloudinary.uploader.upload(file.path)));

  const newDoc = new tour({
    ...req?.body,
    gallery: galleryResults.map(result => result),
    banners: bannersResults.map(result => result),
    mapLogo: mapLogoResult,
    tripHighlights: JSON.parse(req?.body?.tripHighlights),
    months: JSON.parse(req?.body?.months),
    availableDates: JSON.parse(req?.body?.availableDates),
    inclusions: JSON.parse(req?.body?.inclusions),
    exclusions: JSON.parse(req?.body?.exclusions),
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

  const galleryPublicId = isValidId?.gallery.map((img)=>img?.public_id
  )
  const bannersPublicId = isValidId?.banners.map((img)=>img?.public_id
  )


  cloudinary.api.delete_resources([...galleryPublicId,...bannersPublicId,isValidId?.mapLogo]).then(({ deleted }) => console.log(deleted))

  res
    .status(200)
    .json({ status: true, message: "Tour deleted successfully!!" });
});

// @desc - get all tours
// @route - GET api/v1/tour

export const getAllTours = asyncHandler(async (req, res, next) => {
  const data = await tour.find().populate("activity").populate("region");

  res.status(200).json({
    status: true,
    message:
      data?.length >= 1 ? "data found successfully!!" : "No data found!!",
    data,
  });
});

export const getSpecificTours = asyncHandler(async (req, res, next) => {

  const {id} = req?.params
  const data = await tour.find({activity:id}).populate("region");

  if (!data)
    return new errorResponse("No Tour found with given id!!", 400);


  res.status(200).json({
    status: true,
    message:
      data?.length >= 1 ? "data found successfully!!" : "No data found!!",
    data,
  });
});

export const getSpecificRegionTours = asyncHandler(async (req, res, next) => {
  const {id} = req?.params

  const data = await tour.find({region:id}).populate("activity").populate("region");

  if (!data)
    return new errorResponse("No Tour found with given id!!", 400);


  res.status(200).json({
    status: true,
    message:
      data?.length >= 1 ? "data found successfully!!" : "No data found!!",
    data,
  });
});
