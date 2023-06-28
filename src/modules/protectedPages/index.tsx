import React, { useEffect } from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { getUserData } from "../../Utils";
import { PAGES, USER_TYPES } from "../../constants";

const ProtectedPages = () => {
  // if (
  //   getUserData()?.token &&
  //   getUserData()?.role === USER_TYPES._INFLUENCER_ &&
  //   getUserData()?.account_verfied === "0"
  // ) {
  //   console.log("account verification");
  //   return <Navigate to={`/account-verification`} />;
  // }

  //  if (
  //    getUserData()?.token &&
  //    getUserData()?.role === USER_TYPES._INFLUENCER_ &&
  //    getUserData()?.account_verfied !== "0"
  //  ) {
  //    console.log("influencer dashboard");
  //   return <Navigate to={`/${getUserData()?.role}/my/dashboard`} />;
  //  }

  // if (getUserData()?.token && getUserData()?.role === USER_TYPES._FOLLOWER_) {
  //   return <Navigate to={`/${getUserData()?.role}/my/dashboard`} />;
  // }

  if (getUserData()?.token && getUserData()?.role) {
    return <Navigate to={`/my/dashboard/${getUserData()?.role}`} />;
  }

  return <Outlet />;
};

export default ProtectedPages;
