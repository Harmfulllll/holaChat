import React, { useState } from "react";
import "./UserDetails.css";
import { BeatLoader } from "react-spinners";
import useLogout from "../../hooks/useLogout.js";
import { selectConversation } from "../../Redux/conversationSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";

function UserDetails() {
  const { loading, logoutUser } = useLogout();
  const dispatch = useDispatch();
  const Conversation = useSelector((state) => state.conversation);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div className="details">
      {!Conversation.selectedConversation && (
        <div className="no-user-main">
          <div className="no-user">
            <p>Select an user to view their details</p>
          </div>

          <button className="Logout" disabled={loading} onClick={handleLogout}>
            {loading ? <BeatLoader /> : "Logout"}
          </button>
        </div>
      )}
      {Conversation.selectedConversation && (
        <>
          <div className="user-info">
            <img src={Conversation.selectedConversation?.avatar} alt="user" />
            <div className="name-bio">
              <h1>{Conversation.selectedConversation?.username}</h1>
              <p>
                {Conversation.selectedConversation?.bio
                  ? Conversation.selectedConversation?.bio
                  : "No bio"}
              </p>{" "}
            </div>
          </div>
          <div className="more-info">
            <div className="option">
              <div className="title">
                <MdEmail className="email-icon" />
                <div className="email-data">
                  {Conversation.selectedConversation?.email} <br />
                  <p>Email</p>
                </div>
              </div>
            </div>

            <button
              className="Logout"
              disabled={loading}
              onClick={handleLogout}
            >
              {loading ? <BeatLoader /> : "Logout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default UserDetails;
