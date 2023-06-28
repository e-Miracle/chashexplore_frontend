import useCustomMutation from "../useCustomMutation";
import { ENDPOINTS } from "../../constants";
import {
  storeIdentificationTypes,
} from "../../Utils";

function useCustomInfluencerTypes() {
  return useCustomMutation({
    endpoint: ENDPOINTS.API_INFLUENCER_VERIFYABLE_TYPES,
    method: "GET",
    onSettled: (response: any, err: unknown) => {
      if (!err) {
        console.log(response?.data?.data);
        storeIdentificationTypes(response?.data?.data);
      }
    },
    onError: (err: unknown) => {
      // console.log(err, "From useResetPassword hooks");
    },
  });
}

export default useCustomInfluencerTypes;
