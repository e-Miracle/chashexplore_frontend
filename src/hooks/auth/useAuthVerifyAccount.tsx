import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS, _INFLUENCER_ } from "../../constants";
import { useNavigate } from "react-router-dom";
import {
  storeUserData,
  getUserData,
  changeContentTypeHeader,
} from "../../Utils";

function useAuthVerifyAccount() {
  const navigate = useNavigate();
  return useCustomMutation({
    endpoint: ENDPOINTS.API_INFLUENCER_VERIFY_ACCOUNT,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onSettled: (response: any, err: unknown) => {
      if (!err) {
        setTimeout(() => {
          navigate(`/my/dashboard/${getUserData()?.role}`);
        }, 1000);
        changeContentTypeHeader();
      }
    },
    onError: (err: unknown) => {
      // console.log(err, "From useResetPassword hooks");
    },
  });
}

export default useAuthVerifyAccount;
