import userModel from "../models/user.model.js";
import apiResponse from "../utils/apiResponse.js";

const getUsers = async (req, res) => {
  try {
    const user = req.user._id;

    let allUsers = await userModel
      .find({
        _id: {
          $ne: user,
        },
      })
      .select("-password");

    return res.status(200).json(new apiResponse(200, allUsers));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, error.message));
  }
};

export { getUsers };
