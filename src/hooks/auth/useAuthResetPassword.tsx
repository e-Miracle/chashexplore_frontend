import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS } from "../../constants";
import { useNavigate } from "react-router-dom";

function useAuthResetPassword() {
  const navigate = useNavigate();
  return useCustomMutation({
    endpoint: ENDPOINTS.API_INFLUENCER_AUTH_FORGOT_PASSWORD,
    method: "POST",
    onSettled: (response: any, err: unknown) => {
      if (!err) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    },
    onError: (err: unknown) => {},
  });
}

export default useAuthResetPassword;
