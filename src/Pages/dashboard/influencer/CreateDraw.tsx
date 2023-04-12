import React, { Suspense } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { useNavigate } from "react-router-dom";
const Button = React.lazy(() => import("../../../components/Backbtn"));
const Settings = () => {
  const navigate = useNavigate();
  const buttonProps = {
    frontIcon: true,
    icon: {
      prefix: "fas",
      name: "long-arrow-alt-left",
    },
    className: "text-primary font-ubuntu hover:opacity-80 text-sm lg:text-base",
    onClick: () => navigate(-1),
  };
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer">
        <div className="text-[#000]">
          <Button {...buttonProps} frontIcon={true}>
            Back
          </Button>
        </div>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Settings;
