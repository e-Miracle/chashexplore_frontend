import React from "react";
import { isExpired } from "react-jwt";
import { Navigate, Outlet, } from "react-router-dom";
import { getUserData } from "../../Utils";
import { PAGES, USER_TYPES } from "../../constants";

type Props = {
  children: React.ReactNode;
};

const ProtectedPages: React.FC<Props> = ({ children }) => {
  // if (!isExpired(getUserData()?.token) && getUserData()?.token) {
  //   return <Navigate to={`${getUserData()?.role}/my/dashboard`} />;
  // }
  if (getUserData()?.token) {
    return <Navigate to={`/influencer/my/dashboard`} />;
  }

  return <>{children}</>;
};

export default ProtectedPages;
