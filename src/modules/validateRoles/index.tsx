import React from "react";
import { Navigate } from "react-router-dom";
import { getUserData } from "../../Utils";
import toast from "react-hot-toast";
type Props = {
  children: React.ReactNode;
  role: string;
};

const ValidateRole: React.FC<Props> = ({ children, role }) => {
  if (!getUserData()?.role || getUserData()?.role !== role) {
    toast.error("Access Denied", {
      icon: "❌",
    });
    return <Navigate to={`/my/dashboard/${getUserData()?.role}/home`} />;
  }

  return <>{children}</>;
};

export default ValidateRole;
