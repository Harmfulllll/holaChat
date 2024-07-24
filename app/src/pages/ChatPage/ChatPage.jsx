import React from "react";
import "./ChatPage.css";
import ChatList from "../../components/ChatList/ChatList";
import MainChat from "../../components/MainChat/MainChat";
import UserDetails from "../../components/UserDetails/UserDetails";

function ChatPage() {
  return (
    <div className="chatpage">
      <div className="container">
        <ChatList />
        <MainChat />
        <UserDetails />
      </div>
    </div>
  );
}
export default ChatPage;
