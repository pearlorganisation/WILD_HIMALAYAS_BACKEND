import express from "express";

import upload from "../middlewares/multer.js";
import { deleteProduct, getAllProducts, newProduct } from "../controllers/product.js";

const router = express.Router();

router
  .route("/")
  .post(
    upload.fields([
      { name: "banners" },
    ]),
    newProduct
  )
  .get(getAllProducts);

router
  .route("/:id")
  .delete(deleteProduct)

export default router;
