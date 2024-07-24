import jwt from "jsonwebtoken";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import userModel from "../models/user.model.js";
const verify = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json("Unauthorized access");
    }
    const data = await jwt.verify(token, process.env.JWT_SECRET);

    if (!data) {
      return res.status(401).json("Invalid token");
    }
    const user = await userModel.findById(data.id).select("-password");

    if (!user) {
      return res.status(404).json("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json(new apiError(500, error.message));
  }
};

export default verify;
