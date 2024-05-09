import express from "express";

import upload from "../middlewares/multer.js";
import { deleteActivity, getAllActivities, newActivity } from "../controllers/activities.js";
const router = express.Router();

router
  .route("/")
  .post(
    upload.fields([
      { name: "logo", maxCount: 1 },
      { name: "banners" },
    ]),
    newActivity
  )
  .get(getAllActivities);

router.route("/:id").delete(deleteActivity);
export default router;
