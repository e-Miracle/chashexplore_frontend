import axios from "axios";
import { ENDPOINTS } from "../../constants";
import toast from "react-hot-toast";

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
    return err;
  }
};