import React from "react";
import { isExpired } from "react-jwt";
import { Navigate, Outlet } from "react-router-dom";
import { getUserData } from "../../Utils";

const ProtectedPages = ({ role }: { role: string }) => {
  if (!isExpired(getUserData()?.token) && getUserData()?.token) {
    return <Navigate to={`${role}/my/dashboard`} />;
  }

  return <Outlet />;
};

export default ProtectedPages;
