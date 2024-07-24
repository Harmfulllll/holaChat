import express from "express";
import verify from "../middlewares/verify.middleware.js";
import {
  getMessages,
  sendMessage,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/send/:id", verify, sendMessage);

router.get("/:id", verify, getMessages);

export default router;
