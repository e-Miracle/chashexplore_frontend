import React, { Suspense } from "react";
import { DashBoardLayout } from "../../";

const index = () => {
  return (
    <Suspense>
      <DashBoardLayout type="follower">
        <div className="text-[#000] bg-[red]">index lorem*1000 </div>
      </DashBoardLayout>
    </Suspense>
  );
};

export default index;
