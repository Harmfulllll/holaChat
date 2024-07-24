import express from "express";
import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new userModel({
      username,
      email,
      password,
      avatar: "https://avatar.iran.liara.run/public",
    });

    if (newUser) {
      newUser.generateJwt(res);
      await newUser.save();

      res.status(201).json({
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } else {
      res.status(403).json({ error: "Invalid data. Try again" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Please fill in all fields");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const ok = await user.comparePassword(password);
    if (ok) {
      user.generateJwt(res);

      res.status(200).json(
        new apiResponse(
          200,
          {
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              avatar: user.avatar,
            },
          },
          "User logged in successfully"
        )
      );
    } else {
      res.status(403).json("Invalid credentials");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res
      .status(200)
      .json(new apiResponse(200, null, "User logged out successfully"));
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const editBio = async (req, res) => {
  try {
    const { bio } = req.body;
    if (!bio) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.bio = bio;
    await user.save();

    console.log(user);

    res.status(200).json(new apiResponse(200, { user }, "Bio updated"));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;

    if (!avatar) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(avatar);
    user.avatar = avatar;

    await user.save();

    res.status(200).json(
      new apiResponse(
        200,
        {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          },
        },
        "Avatar updated"
      )
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { register, login, logout, editBio, editAvatar };
