import axios from "axios";
import { ENDPOINTS } from "../../constants";
import toast from "react-hot-toast";
import { logout } from "../../Utils";

export const fetchData = async ({
  endpoint,
  page = 1,
}: {
  endpoint: string;
  page?: number;
}) => {
  const route = (ENDPOINTS.API_BASE_URL as string) + endpoint + `?page=${page}`;
  try {
    const { data } = await axios.get(route);
    return data;
  } catch (err: any) {
    toast.error(err.message);
    toast.error(err.response.data.message);
    if (err.response && err.response.status === 401) {
      toast.error("Unauthorized");
      logout();
    }
    return err;
  }
};