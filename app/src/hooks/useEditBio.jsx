import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectConversation } from "../Redux/conversationSlice.js";
const editBio = () => {
  const [bioloading, setBioLoading] = useState(false);

  const Conversation = useSelector((state) => state.conversation);

  const dispatch = useDispatch();
  const edit = async (bio) => {
    try {
      setBioLoading(true);

      const data = await axios.put(
        "/api/v1/auth/update-bio",
        { bio },
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
      toast.success("Bio updated successfully");

      dispatch(selectConversation(data?.data));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBioLoading(false);
    }
  };

  return { bioloading, edit };
};
export default editBio;
