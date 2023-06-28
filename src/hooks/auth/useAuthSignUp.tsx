import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS } from "../../constants";
import { useNavigate } from "react-router-dom";

function useAuthSignUp() {
  const navigate = useNavigate();
  return useCustomMutation({
    endpoint: ENDPOINTS.API_INFLUENCER_AUTH_SIGNUP,
    method: "POST",
    onSettled: (res: unknown, err: unknown) => {
      if (!err)
        setTimeout(() => {
          navigate("/verify-email");
        }, 1000);
    },
    onError: (err: unknown) => {
      console.log(err);
    },
  });
}

export default useAuthSignUp;
