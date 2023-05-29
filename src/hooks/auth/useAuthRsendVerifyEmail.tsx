import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS } from "../../constants";
import { useNavigate } from "react-router-dom";
import { storeUserData } from "../../Utils";
import toast from "react-hot-toast";

function useAuthResendVerifyEmail() {
  const navigate = useNavigate();
  return useCustomMutation({
    endpoint: ENDPOINTS.API_INFLUENCER_AUTH_VERIFY,
    method: "POST",
    onSettled: (response: any, err: unknown) => {
      if (!err) {
        // toast.success(`Successful...${response?.data?.message}`, {
        //   icon: "✅",
        // });
        setTimeout(() => {
          navigate("/verify-email");
        }, 1000);
      }
    },
    onError: (err: unknown) => {
      // console.log(err, "From useResetPassword hooks");
    },
  });
}

export default useAuthResendVerifyEmail;
