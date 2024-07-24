import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice.js";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const logoutUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/auth/logout", {}, config);
      if (res.error) {
        throw new Error(res.error);
      }
      dispatch(logout(res.data));
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logoutUser };
};

export default useLogout;
