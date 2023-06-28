import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS, USER_TYPES, PAGES } from "../../constants";
import { Navigate } from "react-router-dom";
import { storeUserData, getUserData } from "../../Utils";

function useAuthLogin() {
  return useCustomMutation({
    endpoint: ENDPOINTS.API_INFLUENCER_AUTH_LOGIN,
    method: "POST",
    onSettled: (response: any, err: unknown) => {
      if (!err) {
        storeUserData(response?.data);
        window.location.reload();
      }
    },
    onError: (err: unknown) => {
      // console.log(err, "From useResetPassword hooks");
    },
  });
}

export default useAuthLogin;
