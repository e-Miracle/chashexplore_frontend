import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS } from "../../constants";
import { useNavigate } from "react-router-dom";
import { storeUserData } from "../../Utils";

function useAuthLogin() {
  return useCustomMutation({
    endpoint: ENDPOINTS.API_INFLUENCER_AUTH_LOGIN,
    method: "POST",
    onSettled: (response: any, err: unknown) => {
      if (!err) {
        // console.log(
        //   response?.data?.access_token,
        //   "response.data.access__token"
        // );
        console.log(response);
        storeUserData(response?.data);
      }
    },
    onError: (err: unknown) => {
      // console.log(err, "From useResetPassword hooks");
    },
  });
}

export default useAuthLogin;
