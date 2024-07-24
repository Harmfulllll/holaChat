import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
const useRegister = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async ({ username, email, password }) => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters", {
        duration: 4000,
      });
      return false;
    }

    setLoading(true);
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/api/v1/auth/register",
        {
          username,
          email,
          password,
        },
        config
      );
      if (res.error) {
        throw new Error(res.error);
      }
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, registerUser };
};

export default useRegister;
