import express from "express";
import verify from "../middlewares/verify.middleware.js";
import { getUsers } from "../controllers/getUsers.controller.js";

const router = express.Router();

router.get("/", verify, getUsers);

export default router;
