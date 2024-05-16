import mongoose from "mongoose";
import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import overview from "../models/overview.js";

export const newOverview = asyncHandler(async (req, res, next) => {
  const newDoc = await overview.create(req?.body);
  res.status(201).json({
    status: true,
    message: "New overview created successfully!!",
    data: newDoc,
  });
});

export const getAllOverView = asyncHandler(async (req, res, next) => {
  const data = await overview.find();
  res.status(200).json({ status: true, data });
});

export const deleteOverView = asyncHandler(async (req, res, next) => {
  const validId = await overview.findByIdAndDelete(req?.params?.id);
  if (!validId) {
    return res
      .status(400)
      .json({ status: false, message: "No data found with this given id!!" });
  }

  res
    .status(200)
    .json({ status: true, message: "Data deleted successfully!!" });
});
