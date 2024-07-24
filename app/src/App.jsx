import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/SignUp/Signup.jsx";
import ChatPage from "./pages/ChatPage/ChatPage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import store from "./Redux/store.js";
import io from "socket.io-client";
import { setOnlineUsers, setSocket } from "./Redux/socketSlice.js";
function App() {
  const userdata = JSON.parse(localStorage.getItem("user"));

  const user = useSelector((state) => state.auth.user);
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:4000", {
        query: {
          id: userdata.data.user.id,
        },
      });
      dispatch(setSocket(socket));

      socket.on("onlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [user]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={user ? <ChatPage /> : <Login />} />
        <Route path="/login" element={user ? <ChatPage /> : <Login />} />
        <Route path="/register" element={user ? <ChatPage /> : <Register />} />
      </Routes>
    </div>
  );
}
export default App;
