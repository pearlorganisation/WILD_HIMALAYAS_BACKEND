import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import trek from "../models/trek.js";

// @desc - creating new trek
// @route - POST api/v1/trek

export const newTrek = asyncHandler(async (req, res, next) => {
  const { trekLogo, gallery, banners } = req?.files;
  const newDoc = new trek({
    ...req?.body,
    trekLogo:
      Array.isArray(trekLogo) && trekLogo?.length >= 1 && trekLogo[0],
    gallery,
    banners,
    season: JSON.parse(req?.body?.season)
  });
  await newDoc.save();
  res
    .status(201)
    .json({ status: true, message: "New trek created successfully!!" });
});

// @desc - get all treks
// @route - GET api/v1/trek
export const getAllTreks = asyncHandler(async (req, res, next) => {
  const data = await trek.find();
  res.status(200).json({
    status: true,
    message:
      data?.length >= 1 ? "data found successfully!!" : "No data found!!",
    data,
  });
});

// @desc - get particular season treks
// @route - GET api/v1/trek/:name
export const getParticularSeasonTrek = asyncHandler(async (req, res, next) => {
  const { season } = req?.params;
  const data = await trek.find({ season: new RegExp(season, "i") });
  res.status(200).json({
    status: true,
    message:
      data?.length >= 1 ? "data found successfully!!" : "No data found!!",
    data,
  });
});

// @desc - delete particular trek
// @route - GET api/v1/trek/:id
export const deletetrek = asyncHandler(async (req, res, next) => {
  const isValidId = await trek.findByIdAndDelete(req?.params?.id);
  if (!isValidId)
    return new errorResponse("No trek found with given id!!", 400);

  res
    .status(200)
    .json({ status: true, message: "Trek deleted successfully!!" });
});

// @desc - update particular trek
// @route - GET api/v1/trek/:id
export const updateTrek = asyncHandler(async (req, res, next) => {
  const {id} = req?.params
  const {banners,gallery,trekLogo} = req?.files
  const existingData= await trek.findById(id)

  const isValidId = await trek.findByIdAndUpdate(id,{
trekLogo: trekLogo || existingData?.trekLogo

  });
  if (!isValidId)
    return new errorResponse("No trek found with given id!!", 400);


  res
    .status(200)
    .json({ status: true, message: "Trek deleted successfully!!" });
});
