import React, { Suspense, lazy } from "react";
import { DashBoardLayout } from "../../";
import CreateNewDraw from "../../../components/InfluencerDraws/CreateNewDraw";
import Spinner from "../../../components/Spinner";
const InflencerCards = lazy(() => import("../../../components/InflencerCards"));
const InfluencerDraws = lazy(
  () => import("../../../components/InfluencerDraws")
);
const PendingCampaigns = lazy(
  () => import("../../../components/PendingCampaigns")
);
const index = () => {
  const cardProps = {
    raffles: 14,
    participants: 1400,
    tickets: 1478,
  };
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer">
        <div>
          <InflencerCards {...cardProps} />
          <div className=" mt-[1rem] lg:mt-10 grid grid-cols-1 lg:grid-cols-6 gap-[1rem]  md:h-[calc(100vh-30vh)]">
            <div className="col-span-6 lg:col-span-4">
              {" "}
              <InfluencerDraws />
            </div>
            <div className="col-span-6 lg:col-span-2 flex flex-col justify-between">
              {" "}
              <CreateNewDraw />
              <PendingCampaigns />
            </div>
          </div>
        </div>
      </DashBoardLayout>
    </Suspense>
  );
};

export default index;
