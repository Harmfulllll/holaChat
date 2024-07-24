import useGetMessages from "../../hooks/useGetMessages.jsx";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";

const user = JSON.parse(localStorage.getItem("user"));

const ShowMessage = ({ message }) => {
  const Conversation = useSelector((state) => state.conversation);

  const isMe = user?.data?.user?.id === message.sender;

  const formatTime = (time) => {
    const date = new Date(time);
    let hours = date.getHours();
    hours = hours % 12;
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "AM" : "PM";
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <>
      <div className={isMe ? "message-me" : "message"}>
        <img src={Conversation?.selectedConversation?.avatar} alt="" />
        <div className="text">
          <p>{message.message}</p>
          <span>{formatTime(message.createdAt)}</span>
        </div>
      </div>
    </>
  );
};
export default ShowMessage;
