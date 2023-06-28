import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS } from "../../constants";
import { useNavigate } from "react-router-dom";

function useAuthForgotPassword(): any {
  const navigate = useNavigate();
  return useCustomMutation({
    endpoint: ENDPOINTS.API_INFLUENCER_AUTH_FORGOT_PASSWORD,
    method: "GET",
    onSettled: (response: unknown, err: unknown) => {
      if (!err) {
        setTimeout(() => {
          navigate("/reset-password");
        }, 1000);
      }
    },
    onError: (err: unknown) => {
      if(err instanceof Error) console.error(err.message)
    },
  });
}

export default useAuthForgotPassword;
