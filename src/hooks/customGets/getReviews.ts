import axios from "axios";
import { ENDPOINTS } from "../../constants";
import toast from "react-hot-toast";
import { logout } from "../../Utils";
export const fetchReviews = async (campaignId: number, page: number = 1) => {
  const route =
    (ENDPOINTS.API_BASE_URL as string) +
    ENDPOINTS.API_REVIEWS +
    `/${campaignId}` +
    +`?page=${page}`;
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

export const fetchSingleReview = async (id: number) => {
  try {
    const { data } = await axios.get(
      (((ENDPOINTS.API_BASE_URL as string) +
        ENDPOINTS.API_SINGLE_REVIEW) as string) + `/${id}`
    );
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