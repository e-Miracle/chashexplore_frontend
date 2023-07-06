import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS } from "../../constants";
import { getUserData } from "../../Utils";
import { useNavigate } from "react-router-dom"

function useCustomInfluencerTypes(id:number, cb: any, success: any) {
  const navigate = useNavigate()
  return useCustomMutation({
    endpoint: String(ENDPOINTS.API_BUY_TICKET),
    method: "POST",
    onSettled: (response: any, err: unknown) => {
      if (!err) {
        console.log(response?.data?.data);
        cb();
        success();
        setTimeout(() => {
          navigate(
            `/my/dashboard/${getUserData()?.role}/draws/singledraw/${id}`
          );
        }, 1000);
      }
    },
    onError: (err: unknown) => {
      cb();
      // console.log(err, "From useResetPassword hooks");
    },
  });
}

export default useCustomInfluencerTypes;
