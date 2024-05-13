import { cloudinary } from "../../configs/cloudinary.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";

import activities from "../models/activities.js";

// @desc - creating new activity
// @route - POST api/v1/activity
export const newActivity = asyncHandler(async (req, res, next) => {

  const { logo, banners } = req?.files;
  
  // Upload files to Cloudinary
  const logoResult = await cloudinary.uploader.upload(logo[0].path);
  const bannersResults = await Promise.all(banners.map(file => cloudinary.uploader.upload(file.path)));
  // console.log(logo)
  // console.log(first)



    const newDoc = new activities({
      ...req?.body,
      logo:
       logoResult?.secure_url,
       banners: bannersResults.map(result => result.secure_url),
      
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
  
    res
      .status(200)
      .json({ status: true, message: "Trek deleted successfully!!" });
  });