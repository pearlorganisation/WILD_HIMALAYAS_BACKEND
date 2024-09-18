import { cloudinary } from "../../configs/cloudinary.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import product from "../models/product.js";



// @desc - creating new product
// @route - POST api/v1/product
export const newProduct = asyncHandler(async (req, res, next) => {
  
  const { banners } = req?.files;
  
  // Upload files to Cloudinary
  const bannersResults = await Promise.all(banners.map(file => cloudinary.uploader.upload(file.path)));

  const { price, ...rest } = req?.body;
    const newDoc = new product({
      ...req?.body,
       banners: bannersResults.map(result => result.secure_url),
       price: JSON.parse(price),
       ...rest
      
    });
    newDoc.price = newDoc.calculateTotalPrice();
    await newDoc.save();
    res
      .status(201)
      .json({ status: true, message: "New Product created successfully!!" });
  });
  
  // @desc - get all product
  // @route - GET api/v1/product
  export const getAllProducts = asyncHandler(async (req, res, next) => {
    const data = await product.find();
    res.status(200).json({
      status: true,
      message:
        data?.length >= 1 ? "data found successfully!!" : "No data found!!",
      data,
    });
  });

  // @desc - delete particular product
// @route - GET api/v1/product/:id
export const deleteProduct = asyncHandler(async (req, res, next) => {
    const isValidId = await product.findByIdAndDelete(req?.params?.id);
    if (!isValidId)
      return new errorResponse("No trek found with given id!!", 400);
  
    res
      .status(200)
      .json({ status: true, message: "Trek deleted successfully!!" });
  });