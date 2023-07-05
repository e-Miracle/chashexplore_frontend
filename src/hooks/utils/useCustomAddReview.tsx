import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS } from "../../constants";

function useCustomInfluencerTypes() {
  return useCustomMutation({
    endpoint: String(ENDPOINTS.API_ADD_REVIEW),
    method: "POST",
    onSettled: (response: any, err: unknown) => {
      if (!err) {
        console.log(response?.data?.data);
      }
    },
    onError: (err: unknown) => {},
  });
}

export default useCustomInfluencerTypes;
