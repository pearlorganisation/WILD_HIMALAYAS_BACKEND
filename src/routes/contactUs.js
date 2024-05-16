import express from "express";
import { getAllContactUs, newContact } from "../controllers/contactUs.js";


const router = express.Router();

router
  .route("/")
  .post(

    newContact
  )
  .get(getAllContactUs);

// router.route("/:id").delete(deleteActivity);
export default router;
