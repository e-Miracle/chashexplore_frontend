import { useQuery } from "react-query";
import { ENDPOINTS } from "../constants";
import axios, { Method } from "axios";
import { getUserData } from "../Utils";

// queryClient.getQueryData(["character", char.id]);
export const secureRequestHandler = ({
  url,
  method = "get",
  body = undefined,
  headers,
}: {
  url: string;
  method: Method;
  body: any;
  headers?: any;
}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getUserData()?.token}`,
      "Content-Type":
        headers && headers["Content-Type"]
          ? "multipart/form-data"
          : "application/json",
      ...headers,
    },
  };

  method = method.toLocaleLowerCase() as Method;
  if (method === "get") {
    //dont include body in GET request request will fail
    return axios.get(url, {
      params: {
        ...body,
      },
      ...config,
    });
  }
  //   props[card.type as keyof Props];

  return (<any>axios)[method](url, body, config);
};

export function getQueryAction(payload: any) {
  const { endpoint, method, body, headers } = payload;

  const url = ENDPOINTS.API_BASE_URL + endpoint;

  return {
    //@ts-ignore
    queryFn: () => {
      return secureRequestHandler({
        url,
        method,
        body,
        headers,
      });
    },

    ...payload,
  };
}

function useCustomQuery(data: any) {
  const { queryFn, queryKey, endpoint, initialData, then, select, ...others } =
    getQueryAction(data);
  const queryResult: any = useQuery({
    queryFn,

    queryKey: endpoint,
    onSuccess: (response: any) => {
      then?.(response);

      if (!queryResult.isPreviousData && !queryResult.isPlaceholderData) {
      }
    },
    onError: (error: any) => {
      // console.log(error);
    },
    onSettled: (response: any) => {
      // console.log("Settled");
      // toast({
      //   title: "Succesful.",
      //   description: `Fetched user details`,
      //   status: "success",
      //   position: "top-right",
      //   duration: 5000,
      //   isClosable: true,
      // });
    },
    refetchOnWindowFocus: false,
    ...others,
  });

  return { ...queryResult, value: queryResult?.data?.data };
}

export default useCustomQuery;
