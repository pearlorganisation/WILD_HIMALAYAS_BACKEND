import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import contactUs from "../models/contactUs.js";


// @desc - creating new Contact
// @route - POST api/v1/contact

export const newContact = asyncHandler(async (req, res, next) => {

const newDoc = new contactUs({
...req?.body
})

await newDoc.save()

res
.status(201)
.json({ status: true, message: "New Contact created successfully!!" });
})


  // @desc - get all contactUs
  // @route - GET api/v1/contact
  export const getAllContactUs = asyncHandler(async (req, res, next) => {
    
    const data = await contactUs.find();
    res.status(200).json({
      status: true,
      message:
        data?.length >= 1 ? "data found successfully!!" : "No data found!!",
      data,
    });
  });
