import React from "react";
import { isExpired } from "react-jwt";
import { Navigate, Outlet } from "react-router-dom";
import { PAGES } from "../../constants";
import { getUserData } from "../../Utils";

// this checkes if you are loggedIn and redirects to the dashboard
const ProtectedPages = () => {
  /* this checks if the  token gotten from the user object in session storage is expired and the token exists then it redirects  */
  if (!isExpired(getUserData()?.token) && getUserData()?.token) {
    return <Navigate to={PAGES.DASHBOARD_PAGE} />;
  }

  return <Outlet />;
};

export default ProtectedPages;
