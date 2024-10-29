import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";
import { mongoConnect } from "./configs/db.js";

const app = express();
const port = 8000 || process.env.PORT;
app.use(
  cors(
    process.env.NODE_ENV === "production"
      ? {
          origin: ["http://localhost:5173","http://localhost:5174","http://localhost:5175","https://wild-himalayas-mern.vercel.app","https://into-wild-himalaya-admin.vercel.app"],
          credentials: true,
        }
      : {
          origin: ["http://localhost:5173","http://localhost:5174","http://localhost:5175","https://wild-himalayas-mern.vercel.app","https://into-wild-himalaya-admin.vercel.app"],
          methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
          credentials: true,
          maxAge: 600,
          exposedHeaders: ["*", "Authorization"],
        }
  )
);

// @Desc---Middlewares
dotenv.config();
app.use(express.json());

app.listen(port, () => {
  console.log(chalk.yellow.underline.bold(`LISTENING TO PORT-${port}`));
});

// @@desc-----route section------
import authRoutes from "./src/routes/auth.js";
import { error } from "./src/middlewares/error.js";
import mailRoutes from "./src/routes/mail.js"
import activityRoutes from "./src/routes/activities.js"
import tourRoutes from "./src/routes/tour.js"
import contactUsRoutes from "./src/routes/contactUs.js"
import productRoutes from "./src/routes/product.js"
import bookingRouter from "./src/routes/booking.js";
import orderRouter from "./src/routes/order.js";
import regionRouter from "./src/routes/region.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/mail", mailRoutes);
app.use("/api/v1/activity", activityRoutes);
app.use("/api/v1/tour", tourRoutes);
app.use("/api/v1/contactUs", contactUsRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/region", regionRouter);

app.use("/", (req, res) => {
  res.send("Welcome to wild himalayas");
});

app.use(error);
mongoConnect();
