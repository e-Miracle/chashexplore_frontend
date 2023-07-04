import axios from "axios";
import { ENDPOINTS } from "../../constants";
import toast from "react-hot-toast";
import { logout, storeSessionUser } from "../../Utils";
export const fetchUser = async (token: string) => {
  const route = String(ENDPOINTS.API_USER);
  try {
    const { data } = await axios.get(route);
    storeSessionUser({ ...data, token });
    return data?.role;
  } catch (err: any) {
    toast.error(err.message);
    toast.error(err.response.data.message);
    if (err.response && err.response.status === 401) {
      toast.error("Unauthorized");
      logout();
    }
  }
};
