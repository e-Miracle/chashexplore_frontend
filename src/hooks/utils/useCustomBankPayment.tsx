import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS } from "../../constants";
import { getUserData } from "../../Utils";

function useCustomInfluencerTypes(cb:any) {
  return useCustomMutation({
    endpoint: String(ENDPOINTS.API_BUY_TICKET),
    method: "POST",
    onSettled: (response: any, err: unknown) => {
      if (!err) {
        console.log(response?.data?.data);
      }
      cb()
    },
    onError: (err: unknown) => {
      cb();
      // console.log(err, "From useResetPassword hooks");
    },
  });
}

export default useCustomInfluencerTypes;
