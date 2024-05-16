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
          origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
          ],
          credentials: true,
        }
      : {
          origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
          ],
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
import trekRoutes from "./src/routes/trek.js";
import { error } from "./src/middlewares/error.js";

import mailRoutes from "./src/routes/mail.js";
import activityRoutes from "./src/routes/activities.js";
import tourRoutes from "./src/routes/tour.js";
import overViewRoutes from "./src/routes/overview.js";


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/trek", trekRoutes);
app.use("/api/v1/mail", mailRoutes);
app.use("/api/v1/activity", activityRoutes);
app.use("/api/v1/tour", tourRoutes);

app.use("/api/v1/contactUs", contactUsRoutes);


app.use("/api/v1/overview", overViewRoutes);

app.use("/", (req, res) => {
  res.send("Welcome to wild himalayas");
});

app.use(error);
mongoConnect();
