import React, { useEffect, useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import useRegister from "../../hooks/useRegister.js";

function Register() {
  const { loading, registerUser } = useRegister();
  const [state, setState] = useState({
    email: "",
    password: "",
    username: "hhh",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await registerUser({
      username: state.username,
      email: state.email,
      password: state.password,
    });
  };
  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="register-main">
      <div className="login">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Create account</h1>
            <input
              label="Username: "
              placeholder="Enter your username"
              type="text"
              onChange={(e) => handleChange(e)}
              name="username"
            />
            <input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              onChange={(e) => handleChange(e)}
              name="email"
            />
            <input
              label="Password: "
              type="password"
              onChange={(e) => handleChange(e)}
              name="password"
              placeholder="Enter your password"
            />
            <button className="register" disabled={loading}>
              {loading ? <BeatLoader /> : "Register"}
            </button>
            {/*     {error && <span>{error}</span>} */}
            <div className="no-account">
              <Link className="link" to="/login">
                <p>Already have an account?</p>
              </Link>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
