import React, { Suspense } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
const Transactions = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer">
        <div className="text-[#000] bg-[red]">index lorem*1000 </div>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Transactions;
