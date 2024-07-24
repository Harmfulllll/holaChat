import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { selectConversation, setMessages } from "../Redux/conversationSlice.js";
import { useSelector, useDispatch } from "react-redux";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const Conversation = useSelector((state) => state.conversation);
  const [getloading, setLoading] = useState(false);
  const messages = Conversation.messages;

  useEffect(() => {
    const getMessages = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      try {
        setLoading(true);
        dispatch(setMessages([]));
        const data = await axios.get(
          `/api/v1/conversation/${Conversation.selectedConversation._id}`,
          null,
          config
        );
        /*     console.log(1); */
        if (data?.error?.response?.data?.message == "No messages found") {
          console.log("No messages found");
          dispatch(setMessages([]));
        }
        if (data.error) {
          throw new Error(data.error);
        }

        dispatch(setMessages(data.data));
      } catch (error) {
        /*  console.log(data?.error?.response?.data?.message); */
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [Conversation.selectedConversation?._id, setMessages]);

  /* return { getloading }; */
};

export default useGetMessages;
