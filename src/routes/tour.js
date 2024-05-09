import express from "express";

import upload from "../middlewares/multer.js";
import { deleteTour, getAllTours, newTour } from "../controllers/tour.js";
const router = express.Router();

router
  .route("/")
  .post(
    upload.single("banner"),
    newTour
  )
  .get(getAllTours);

// router.route("/:season").get(getParticularSeasonTrek);
router.route("/:id").delete(deleteTour);
export default router;
