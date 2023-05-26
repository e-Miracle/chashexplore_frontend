import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserData } from "../../Utils";
import { isExpired } from "react-jwt";
import toast from "react-hot-toast";

const AuthorizedPages = () => {
  if (!getUserData()?.token || isExpired(getUserData()?.token)) {
    toast.error("Server Error...Expired/No token", {
      icon: "❌",
    });
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};

export default AuthorizedPages;
