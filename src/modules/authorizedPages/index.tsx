import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PAGES } from "../../constants";
import { getUserData } from "../../Utils";
import { isExpired } from "react-jwt";
import toast from "react-hot-toast";

//this checks if your token is expired and logs you out
const AuthorizedPages = () => {
  /* this checks if the  token gotten from the user object in session storage is expired and the token exists then it redirects  */
  if (!getUserData()?.token || isExpired(getUserData()?.token)) {
    toast.error("Expired/No token");
    return <Navigate to={PAGES.LOGIN_PAGE} />;
  }
  return <Outlet />;
};

export default AuthorizedPages;
