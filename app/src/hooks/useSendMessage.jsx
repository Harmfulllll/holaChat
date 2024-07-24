import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { selectConversation, setMessages } from "../Redux/conversationSlice.js";
import { useSelector, useDispatch } from "react-redux";
import useGetMessages from "./useGetMessages";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const Conversation = useSelector((state) => state.conversation);

  const id = Conversation.selectedConversation?._id;

  const sendMessage = async (message) => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      const data = await axios.post(
        `/api/v1/conversation/send/${id}`,
        JSON.stringify({ message }),
        config
      );

      if (data.error) {
        throw new Error(data.error);
      }

      dispatch(setMessages(data.data));
    } catch (error) {
      toast.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
