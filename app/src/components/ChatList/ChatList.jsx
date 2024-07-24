import React, { useEffect, useState } from "react";
import "./ChatList.css";
import { FaSearch } from "react-icons/fa";
import useSidebar from "../../hooks/useSidebar.js";
import { IoMdSettings } from "react-icons/io";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import Conversation from "./Conversation.jsx";
import editBio from "../../hooks/useEditBio.jsx";
import editAvatar from "../../hooks/useEditAvatar.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ChatList() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { loading, conversation } = useSidebar();
  const conversationSlice = useSelector((state) => state.conversation);
  const user = JSON.parse(localStorage.getItem("user"));
  const [bio, setBio] = useState("");
  const [addavatar, setaddAvatar] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { bioloading, edit } = editBio();

  const updateBio = async (e) => {
    e.preventDefault();
    await edit(bio);
    setBio("");
  };

  const { avatarLoading, newAvatar } = editAvatar();
  const updateAvatar = async (e) => {
    e.preventDefault();
    await newAvatar(addavatar);
    setaddAvatar("");
  };

  return (
    <div className="list">
      <div className="user-data">
        <img src={user.data.user.avatar} alt="user" />
        <h1>{user.data.user.username}</h1>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit your bio
            </Typography>{" "}
            <br />
            <TextField
              id="outlined-basic"
              label="Bio"
              variant="outlined"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />{" "}
            <Button variant="contained" onClick={updateBio}>
              {bioloading ? <BeatLoader /> : "Update"}
            </Button>{" "}
            <br />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Change avatar
            </Typography>{" "}
            <br />
            <TextField
              id="outlined-basic"
              label="Enter avatar link"
              variant="outlined"
              value={addavatar}
              onChange={(e) => setaddAvatar(e.target.value)}
            />{" "}
            <Button variant="contained" onClick={updateAvatar}>
              {avatarLoading ? <BeatLoader /> : "Update"}
            </Button>
          </Box>
        </Modal>
        <div className="settings-icon" onClick={handleOpen}>
          {" "}
          <IoMdSettings />
        </div>
      </div>
      <div className="search">
        <div className="searchbar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="user-list">
        {conversation
          .filter(({ username }) => {
            return username.indexOf(search) >= 0;
          })
          .map((conversation) => (
            <Conversation key={conversation._id} conversation={conversation} />
          ))}

        {/*     {conversation.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} />
        ))} */}

        {loading ? <BeatLoader /> : null}
      </div>
    </div>
  );
}
export default ChatList;
