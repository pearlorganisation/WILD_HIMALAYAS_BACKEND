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

  // @desc - delete particular contactUsData
// @route - GET api/v1/contactUs/:id

export const deleteContactUs = asyncHandler(async (req, res, next) => {
    const isValidId = await contactUs.findByIdAndDelete(req?.params?.id);
    if (!isValidId)
      return new errorResponse("No Contact found with given id!!", 400);
  
    res
      .status(200)
      .json({ status: true, message: "Contact deleted successfully!!" });
  });