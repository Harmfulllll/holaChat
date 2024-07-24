import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useSidebar = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const config = {
      withCredentials: true,
    };
    setLoading(true);
    const getSidebar = async () => {
      try {
        const res = await axios.get("/api/v1/get-users", null, config);

        if (res.error) {
          throw new Error(res.error);
        }
        setConversation(res.data.data);
      } catch (error) {
        toast.error(error.response?.data || error.message);
        return false;
      } finally {
        setLoading(false);
      }
    };
    getSidebar();
  }, []);

  return { loading, conversation };
};

export default useSidebar;
