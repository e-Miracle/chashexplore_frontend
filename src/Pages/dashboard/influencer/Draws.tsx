import React, { Suspense } from "react";
import { DashBoardLayout } from "../../";

const Draws = () => {
  return (
    <Suspense>
      <DashBoardLayout type="influencer">
        <div className="text-[#000] bg-[red]">index lorem*1000 </div>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Draws;
