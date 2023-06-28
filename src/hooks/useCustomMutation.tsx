import { useMutation } from "react-query";
import { ENDPOINTS, PAGES } from "../constants";
import { secureRequestHandler } from "./useCustomQuery";
import { Navigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";

const getMutationAction = (mutationData: any) => {
  const { endpoint, method, headers } = mutationData;
  const url = ENDPOINTS.API_BASE_URL + endpoint;

  return {
    mutationFn: (body: any) =>
      secureRequestHandler({
        url,
        method,
        body,
        headers,
      }),
    ...mutationData,
  };
};

function useCustomMutation(mutationData: any) {
  const { mutationFn, endpoint, then, onSuccess, ...others } =
    getMutationAction(mutationData);

  const mutatationResult: any = useMutation(mutationFn, {
    mutationKey: endpoint,
    onError: (err: any) => {
      toast.error(
        `${err?.response?.statusText}...${err.response?.data?.message}`,
        {
          icon: "❌",
        }
      );

      //logs out a user if their token is expired
      if (err.response.status === 401) {
        sessionStorage.clear();
        delete axios.defaults.headers.common["Authorization"];
        return <Navigate to={PAGES.LOGIN_PAGE} />;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    ...others,
  });

  return { ...mutatationResult, value: mutatationResult?.data?.data };
}

export default useCustomMutation;
