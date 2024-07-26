import express from "express";
import { deleteContactUs, getAllContactUs, newContact } from "../controllers/contactUs.js";


const router = express.Router();

router
  .route("/")
  .post(

    newContact
  )
  .get(getAllContactUs);

router.route("/:id").delete(deleteContactUs);
export default router;
