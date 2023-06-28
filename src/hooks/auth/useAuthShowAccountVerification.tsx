import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS, _INFLUENCER_ } from "../../constants";

function useAuthShowVerifyAccount() {
  return useCustomMutation({
    endpoint: ENDPOINTS.API_INFLUENCER_VERIFY_ACCOUNT,
    method: "GET",
    onSettled: (response: any, err: unknown) => {
      console.log(response)
    },
    onError: (err: unknown) => {
      //
    },
  });
}

export default useAuthShowVerifyAccount;
