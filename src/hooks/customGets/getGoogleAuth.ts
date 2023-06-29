import axios from "axios";
import toast from "react-hot-toast";

export const fetchAuth = async (endpoint: string) => {
  try {
    const { data } = await axios.get(endpoint);
    return data;
  } catch (err: any) {
    toast.error(err.message);
    toast.error(err.response.data.message);
    return err;
  }
};
