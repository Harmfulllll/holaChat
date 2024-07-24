import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server, io } from "./socket.js";

import connectDB from "./src/database/db.js";

/* Import routes */
import userAuthRoutes from "./src/routes/userAuth.routes.js";
import conversationRoutes from "./src/routes/conversation.routes.js";
import getUsers from "./src/routes/getUsers.routes.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.enable("trust proxy");
/* no */
/* setup routing */
app.use("/api/v1/auth", userAuthRoutes);
app.use("/api/v1/conversation", conversationRoutes);
app.use("/api/v1/get-users", getUsers);

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
