import messageModel from "../models/message.model.js";
import convoModel from "../models/convo.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { io } from "../../socket.js";
import { getReceiverId } from "../../socket.js";

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const sender = req.user._id;
    const receiver = req.params.id;

    let conversation = await convoModel.findOne({
      members: {
        $all: [sender, receiver],
      },
    });
    if (!conversation) {
      conversation = await convoModel.create({
        members: [sender, receiver],
      });
    }

    const saveMessage = new messageModel({
      sender,
      receiver,
      message,
    });

    if (saveMessage) await conversation.messages.push(saveMessage._id);

    await Promise.all([saveMessage.save(), conversation.save()]);

    const receiverId = getReceiverId(sender);
    if (receiverId) {
      io.to(receiverId).emit("newMessage", saveMessage);
    }

    return res.status(201).json(
      new apiResponse(
        201,
        {
          message: saveMessage,
        },
        "Message sent successfully"
      )
    );
  } catch (error) {
    res.status(500).json(new apiError(500, error.message));
  }
};

const getMessages = async (req, res) => {
  try {
    const sender = req.user._id;
    const receiver = req.params.id;

    const conversation = await convoModel
      .findOne({
        members: { $all: [sender, receiver] },
      })
      .populate("messages");

    if (!conversation) {
      return res
        .status(404)
        .json(new apiResponse(404, [], "No messages found"));
    }

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          [...conversation?.messages],
          "Messages fetched successfully"
        )
      );
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

export { sendMessage, getMessages };
