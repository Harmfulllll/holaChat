import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="main">
      <div className="page1">
        <div className="nav">
          <div className="nav-left">
            <img src="/icon.png" alt=" Logo" />
            <h1>Chat</h1>
          </div>
          <div className="nav-right">
            <button className="button">Contact</button>
            <button className="button">Login</button>
          </div>
        </div>
        <div className="center">
          <h1>
            Chat with anyone,
            <br /> anywhere
          </h1>
          <p>Your favourite chat app's favourite chat app</p>
          <button className="button">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
