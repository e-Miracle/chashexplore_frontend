import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserData } from "../../Utils";
import toast from "react-hot-toast";
import { PAGES, USER_TYPES } from "../../constants";
type Props = {
  children: React.ReactNode;
};

const AuthorizedPages = () => {
  if (!getUserData()?.token ) {
    toast.error("Server Error...Expired/No token", {
      icon: "❌",
    });
    return <Navigate to={PAGES.LOGIN_PAGE} />;
  }

  // this just makes sure our influencers are verified before accessing
  // if (
  //   getUserData()?.token &&
  //   getUserData()?.role === USER_TYPES._INFLUENCER_ &&
  //   getUserData()?.account_verfied === "0"
  // ) {
  //   toast.error("Influencer...Validation/Failed", {
  //     icon: "❌",
  //   });
  //   return <Navigate to={PAGES.INFLUENCER_ACCOUNT_VALIDATION} />;
  // }

 return <Outlet />;
};

export default AuthorizedPages;

