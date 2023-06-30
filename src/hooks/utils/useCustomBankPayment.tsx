import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS } from "../../constants";
import { getUserData } from "../../Utils";

function useCustomInfluencerTypes() {
  return useCustomMutation({
    endpoint: ENDPOINTS.API_BUY_TICKET,
    method: "POST",
    onSettled: (response: any, err: unknown) => {
      if (!err) {
        console.log(response?.data?.data);
      }
    },
    onError: (err: unknown) => {
      // console.log(err, "From useResetPassword hooks");
    },
  });
}

export default useCustomInfluencerTypes;
