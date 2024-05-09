import express from "express";
import {
  deletetrek,
  getAllTreks,
  getParticularSeasonTrek,
  newTrek,
} from "../controllers/trek.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router
  .route("/")
  .post(
    upload.fields([
      { name: "trekLogo", maxCount: 1 },
      { name: "gallery" },
      { name: "banners" },
    ]),
    newTrek
  )
  .get(getAllTreks);

router.route("/:season").get(getParticularSeasonTrek);
router.route("/:id").delete(deletetrek);
export default router;
