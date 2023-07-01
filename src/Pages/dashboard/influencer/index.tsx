import { Suspense, lazy } from "react";
import { DashBoardLayout } from "../../";
import CreateNewDraw from "../../../components/InfluencerDraws/CreateNewDraw";
import Spinner from "../../../components/Spinner";
import { getUserData } from "../../../Utils";
const InflencerCards = lazy(() => import("../../../components/InflencerCards"));
const InfluencerDraws = lazy(
  () => import("../../../components/InfluencerDraws")
);
const PendingCampaigns = lazy(
  () => import("../../../components/PendingCampaigns")
);
const index = () => {
  const cardProps = {
    raffles: getUserData()?.number_of_raffles_created ? Number(getUserData()?.number_of_raffles_created): 0,
    participants: getUserData()?.participants_reached ? Number(getUserData()?.participants_reached): 0,
    tickets: getUserData()?.number_of_tickets_sold ?  Number(getUserData()?.number_of_tickets_sold) : 0,
  };
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer">
        <div className="px-5 lg:px-0 mt-0">
          <InflencerCards {...cardProps} />
          <div className=" mt-[1rem] lg:mt-10 grid grid-cols-1 lg:grid-cols-6 gap-[1rem]  md:h-[calc(100vh-30vh)]">
            <div className="col-span-6 lg:col-span-4">
              {" "}
              <InfluencerDraws />
            </div>
            <div className="col-span-6 lg:col-span-2   mb-5 lg:mb-0">
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
