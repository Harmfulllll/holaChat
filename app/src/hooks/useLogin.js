import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../Redux/authSlice";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async ({ email, password }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/v1/auth/login",
        {
          email,
          password,
        },
        config
      );
      if (res.error) {
        throw new Error(res.error);
      }
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(login(res.data));
      navigate("/chat");
    } catch (error) {
      toast.error(error.response?.data || error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, loginUser };
};

export default useLogin;
