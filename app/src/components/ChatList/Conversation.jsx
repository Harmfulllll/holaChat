import { selectConversation } from "../../Redux/conversationSlice.js";
import { useDispatch, useSelector } from "react-redux";
const Conversation = ({ conversation }) => {
  const dispatch = useDispatch();
  const selectedConversation = useSelector(
    (state) => state.conversation.selectedConversation
  );

  const selected = conversation._id === selectedConversation?._id;

  return (
    <div
      className="user"
      key={conversation._id}
      onClick={() => {
        dispatch(selectConversation(conversation));
      }}
      style={{ backgroundColor: selected ? "#FFF1DB" : "" }}
    >
      <img src={conversation.avatar} alt="user" />
      <div className="user-message">
        <h1>{conversation.username}</h1>
        {/*    <p>Message</p> */}
      </div>
    </div>
  );
};

export default Conversation;
