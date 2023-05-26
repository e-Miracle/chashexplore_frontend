import React from "react";
import { isExpired } from "react-jwt";
import { Navigate, Outlet } from "react-router-dom";
import { getUserData } from "../../Utils";

type Props = {
  children: React.ReactNode
}

// const ProtectedPages = () => {
//   if (!isExpired(getUserData()?.token) && getUserData()?.token) {
//     return <Navigate to={`${getUserData()?.role}/my/dashboard`} />;
//   }

//   return <Outlet />;
// };

// export default ProtectedPages;


const ProtectedPages: React.FC<Props> = ({ children }) => {
  if (!isExpired(getUserData()?.token) && getUserData()?.token) {
    return <Navigate to={`${getUserData()?.role}/my/dashboard`} />;
  }
  return <>{children}</>;
};

export default ProtectedPages;