import express from "express";
import {
  editAvatar,
  editBio,
  login,
  logout,
  register,
} from "../controllers/userAuth.controller.js";
import verify from "../middlewares/verify.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.put("/update-bio", verify, editBio);

router.put("/update-avatar", verify, editAvatar);

export default router;
