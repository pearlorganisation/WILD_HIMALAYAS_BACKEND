import express from "express";
import {
  deleteOverView,
  getAllOverView,
  newOverview,
} from "../controllers/overview.js";
const router = express.Router();
router.route("/").get(getAllOverView).post(newOverview);
router.route("/:id").delete(deleteOverView);

export default router;
