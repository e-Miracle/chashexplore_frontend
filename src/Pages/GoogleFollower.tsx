import React, { Suspense } from "react";
import { Spinner } from ".";
import { useLocation, Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { ENDPOINTS, _INFLUENCER_, _FOLLOWER_ } from "../constants";
import { fetchAuth } from "../hooks/customGets";
import { storeSocialData, getUserData } from "../Utils";
import axios from "axios";

const Google = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  //   const url =
  //     ENDPOINTS.API_BASE_URL +
  //     String(ENDPOINTS.API_FOLLOWER_AUTH_GOOGLE) +
  //         `?${queryParams.toString()}`;

  const url =
    ENDPOINTS.API_BASE_URL +
    String(ENDPOINTS.API_INFLUENCER_AUTH_GOOGLE) +
    `/${_FOLLOWER_}` +
    `?${queryParams.toString()}`;
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

  if (isLoading) return <Spinner toggle={false} />;

  if (isError) {
    const errorMessage = (error as any).message || "An unknown error occurred";
    return (
      <div>
        <p>There was an error fetching the data.</p>
        <p>{errorMessage}</p>
      </div>
    );
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
