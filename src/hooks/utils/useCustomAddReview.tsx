import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS } from "../../constants";

function useCustomInfluencerTypes(cb: any) {
  return useCustomMutation({
    endpoint: String(ENDPOINTS.API_ADD_REVIEW),
    method: "POST",
    onSettled: (response: any, err: unknown) => {
      if (!err) {
        console.log(response?.data?.data);
        cb();
      }
    },
    onError: (err: unknown) => {
      cb();
    },
  });
}

export default useCustomInfluencerTypes;
