import { set } from "mongoose";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../Redux/conversationSlice.js";
const useRealTimeMessages = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const messages = useSelector((state) => state.conversation.messages);

  useEffect(() => {
    socket?.on("newMessage", (message) => {
      dispatch(setMessages(message));
    });
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useRealTimeMessages;
