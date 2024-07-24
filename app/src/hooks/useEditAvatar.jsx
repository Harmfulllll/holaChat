import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/authSlice";
import toast from "react-hot-toast";

const editAvatar = () => {
  const dispatch = useDispatch();
  const [avatarLoading, setAvatarLoading] = useState(false);

  const Conversation = useSelector((state) => state.conversation);

  const newAvatar = async (avatar) => {
    try {
      setAvatarLoading(true);

      const data = await axios.put(
        "/api/v1/auth/update-avatar",
        { avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user", JSON.stringify(data?.data));
      toast.success("Avatar updated successfully");
      dispatch(login(data?.data));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAvatarLoading(false);
    }
  };

  return { avatarLoading, newAvatar };
};

export default editAvatar;
