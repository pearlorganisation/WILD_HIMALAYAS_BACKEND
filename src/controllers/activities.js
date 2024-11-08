import { cloudinary } from "../../configs/cloudinary.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";

import activities from "../models/activities.js";

// @desc - creating new activity
// @route - POST api/v1/activity
export const newActivity = asyncHandler(async (req, res, next) => {

  const { banners } = req?.files;
  
  // Upload files to Cloudinary
  const bannersResults = await Promise.all(banners.map(file => cloudinary.uploader.upload(file.path)));
    const newDoc = new activities({
      ...req?.body,
       banners: bannersResults.map(result => result),
      
    });
    await newDoc.save();
    res
      .status(201)
      .json({ status: true, message: "New Activity created successfully!!" });
  });
  
  // @desc - get all activity
  // @route - GET api/v1/activity
  export const getAllActivities = asyncHandler(async (req, res, next) => {
    const data = await activities.find();
    res.status(200).json({
      status: true,
      message:
        data?.length >= 1 ? "data found successfully!!" : "No data found!!",
      data,
    });
  });

  // @desc - delete particular activity
// @route - GET api/v1/activity/:id
export const deleteActivity = asyncHandler(async (req, res, next) => {
    const isValidId = await activities.findByIdAndDelete(req?.params?.id);
    if (!isValidId)
      return new errorResponse("No trek found with given id!!", 400);
  
    const bannersPublicId = isValidId?.banners.map((img)=>img?.public_id
  )
  cloudinary.api.delete_resources([...bannersPublicId]).then(({ deleted }) => console.log(deleted))

    res
      .status(200)
      .json({ status: true, message: "Trek deleted successfully!!" });
  });