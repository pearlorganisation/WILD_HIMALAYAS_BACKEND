import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import region from "../models/region.js";



// @desc - creating new region
// @route - POST api/v1/region
export const newRegion = asyncHandler(async (req, res, next) => {
    const newDoc = new region({
      ...req?.body,
    });
    await newDoc.save();
    res
      .status(201)
      .json({ status: true, message: "New Region created successfully!!" });
  });
  
  // @desc - get all region
  // @route - GET api/v1/region
  export const getAllRegions = asyncHandler(async (req, res, next) => {
    const data = await region.find();
    res.status(200).json({
      status: true,
      message:
        data?.length >= 1 ? "data found successfully!!" : "No data found!!",
      data,
    });
  });

  // @desc - delete particular region
// @route - GET api/v1/region/:id
export const deleteRegion = asyncHandler(async (req, res, next) => {
    const isValidId = await region.findByIdAndDelete(req?.params?.id);
    if (!isValidId)
      return new errorResponse("No trek found with given id!!", 400);
  
    res
      .status(200)
      .json({ status: true, message: "Trek deleted successfully!!" });
  });