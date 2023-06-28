import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS, _INFLUENCER_ } from "../../constants";
import { useNavigate } from "react-router-dom";

function useUpdateCampaign(id: number) {
  const navigate = useNavigate();
  return useCustomMutation({
    endpoint: ENDPOINTS.API_INFLUENCER_CREATE_CAMPAIGN + `/${id}`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onSettled: (response: any, err: unknown) => {
      if (!err) {
        console.log(response?.data);
        setTimeout(
          () =>
            navigate(`/my/dashboard/${_INFLUENCER_}/draws/singledraw/${id}`),
          1000
        );
      }
    },
    onError: (err: unknown) => {
      // console.log(err, "From useResetPassword hooks");
    },
  });
}

export default useUpdateCampaign;
