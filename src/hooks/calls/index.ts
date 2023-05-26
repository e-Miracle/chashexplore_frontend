import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS } from "../../constants";

export function useAuthSignUp() {
  return useCustomMutation({
    endpoint: ENDPOINTS.API_FOLLOWER_AUTH_SIGNUP,
    method: "POST",
    onError: (err:any) => {
      console.log(err);
    },
  });
}

