import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS } from "../../constants";

function useCreateInfluencerCampaign() {
  return useCustomMutation({
    endpoint: ENDPOINTS.API_INFLUENCER_CREATE_CAMPAIGN,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onSettled: (response: any, err: unknown) => {
      if (!err) {
        console.log(response?.data);

        //there is a probability that there is a campaign array and that array woulbe added to when we make ths request from session storage
      }
    },
    onError: (err: unknown) => {
      // console.log(err, "From useResetPassword hooks");
    },
  });
}

export default useCreateInfluencerCampaign;
