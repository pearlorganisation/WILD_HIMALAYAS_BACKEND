import express from "express";
import { deleteRegion, getAllRegions, newRegion } from "../controllers/region.js";

const router = express.Router();

router
  .route("/")
  .post(newRegion)
  .get(getAllRegions);

router
  .route("/:id")
  .delete(deleteRegion)

export default router;
