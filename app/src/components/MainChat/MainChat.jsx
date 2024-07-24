import React, { useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import "./MainChat.css";
import { IoMdCall } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { FaInfoCircle, FaVideo } from "react-icons/fa";
import { selectConversation } from "../../Redux/conversationSlice";
import { useSelector } from "react-redux";
import useSendMessage from "../../hooks/useSendMessage.jsx";
import useGetMessages from "../../hooks/useGetMessages.jsx";
import { BeatLoader } from "react-spinners";
import ShowMessage from "./ShowMessage.jsx";
import useRealTimeMessages from "../../hooks/useRealTimeMessages.js";

function MainChat() {
  const [openEmoji, setOpenEmoji] = React.useState(false);
  const [input, setInput] = React.useState("");
  const { loading, sendMessage } = useSendMessage();

  useGetMessages();
  useRealTimeMessages();

  const messages = useSelector((state) => state.conversation.messages);

  /* check for messages */
  console.log(messages);

  const user = JSON.parse(localStorage.getItem("user"));

  const Conversation = useSelector((state) => state.conversation);

  const onlineUsers = useSelector((state) => state.socket.onlineUsers);

  const isOnline = onlineUsers.includes(Conversation.selectedConversation?._id);

  const send = async (e) => {
    e.preventDefault();
    if (!input) return;
    await sendMessage(input);
    setInput("");
  };

  const ref = useRef(null);
  useEffect(() => {
    setTimeout(() => ref?.current?.scrollIntoView({ behaviour: "smooth" }), 50);
  }, [messages]);

  useEffect(() => {
    return () => {
      selectConversation(null);
    };
  }, [Conversation.selectedConversation]);

  const handleEmoji = (e) => {
    setInput(input + e.emoji);
    setOpenEmoji(false);
  };

  return (
    <div className="chat">
      {!Conversation.selectedConversation ? (
        <>
          <div className="no-convo-container">
            <div className="no-convo">
              <p>Welcome back {user.data.user.username} 👋 </p>
              <p>Start a conversation</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="top">
            <div className="user-info">
              <img src={Conversation.selectedConversation.avatar} alt="user" />
              <div className="name-status">
                <h1>{Conversation.selectedConversation.username}</h1>
                <p>{isOnline ? "Online" : "Offline"}</p>{" "}
              </div>
            </div>
            <div className="icons">
              <IoMdCall /> <FaVideo /> <FaInfoCircle />
            </div>
          </div>

          <div className="middle">
            {
              /* !getloading && */ messages?.data?.length === 0 && (
                <p className="text-center">
                  Send a message to start the conversation
                </p>
              )
            }
            {
              /* !getloading && */
              messages?.data?.length > 0 &&
                messages?.data?.map((message) => (
                  <div key={message._id}>
                    <ShowMessage message={message} />
                  </div>
                ))
            }
            <div className="useref" ref={ref}></div>

            {/* {getloading && <BeatLoader />} */}
          </div>

          <div className="bottom">
            <input
              type="text"
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="emoji">
              <MdEmojiEmotions
                className="emoji-icon"
                onClick={() => {
                  setOpenEmoji((prev) => !prev);
                }}
              />
              <div className="picker">
                <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
              </div>
            </div>
            <button className="send" type="submit" onClick={(e) => send(e)}>
              {loading ? <BeatLoader /> : "Send"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default MainChat;
