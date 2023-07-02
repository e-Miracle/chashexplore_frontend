import React, { Suspense } from "react";
import { Spinner } from ".";
import { useLocation, Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { ENDPOINTS, _INFLUENCER_ } from "../constants";
import { fetchAuth } from "../hooks/customGets";
import { storeSocialData, getUserData } from "../Utils";
import axios from "axios";
const Error = React.lazy(() => import('../components/ErrorComponent'));

const Google = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const url =
    ENDPOINTS.API_BASE_URL +
    String(ENDPOINTS.API_INFLUENCER_AUTH_GOOGLE) +
    `/${_INFLUENCER_}` +
    `?${queryParams.toString()}`;
  //i need a way to differentiate between influencer and follower
  const { isLoading, isError, data, error } = useQuery(
    "google",
    () => fetchAuth(url),
    {
      onSuccess: (data) => {
        data?.data && storeSocialData(data?.data);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data?.data?.token}`;
        if (data) toast.success("Successful");
      },
      onError: (err) => {
        if (err) toast.error("An error occured");
      },
    }
  );

  if (isLoading) return <Spinner  />;

  if (isError) {
    const errorMessage = (error as any).message || "An unknown error occurred";
    return <Error err={errorMessage} />;
  }
  return (
    <Suspense fallback={<Spinner />}>
      {getUserData()?.role ? (
        <Navigate to={`/my/dashboard/${data?.data?.user?.role}/home`} />
      ) : (
        <Spinner />
      )}
    </Suspense>
  );
};

export default Google;
