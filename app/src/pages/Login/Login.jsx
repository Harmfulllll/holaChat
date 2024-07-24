import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin.js";
import { BeatLoader } from "react-spinners";
function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { loading, loginUser } = useLogin();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(state);
  };

  return (
    <div className="login-main">
      <div className="login">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Welcome back</h1>

            <input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              onChange={handleChange}
              name="email"
            />
            <input
              label="Password: "
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="Enter your password"
            />
            <button className="login-submit" disabled={loading}>
              {loading ? <BeatLoader /> : "Login"}
            </button>
            <div className="no-account">
              <Link className="link" to="/register">
                <p>{"Don't"} you have an account?</p>
              </Link>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
