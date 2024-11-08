import express from "express";

import upload from "../middlewares/multer.js";
import { deleteTour, getAllTours, getSpecificRegionTours, getSpecificTours, newTour } from "../controllers/tour.js";
const router = express.Router();

router
  .route("/")
  .post(
    upload.fields([{name:"mapLogo"},{name:"itineraryLogo"},{name:"gallery"},{name:"banners"}]),
    newTour
  )
  .get(getAllTours);

router.route("/:id").get(getSpecificTours).delete(deleteTour);
router.route("/region/:id").get(getSpecificRegionTours)
export default router;
