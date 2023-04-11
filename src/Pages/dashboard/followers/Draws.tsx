import React, { Suspense } from "react";
import { DashBoardLayout } from "../../";
import { USER_TYPES } from "../../../constants";
const Draws = () => {
  return (
    <Suspense>
      <DashBoardLayout type="follower">
        <div className="text-[#000] bg-[red]">index lorem*1000 </div>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Draws;
