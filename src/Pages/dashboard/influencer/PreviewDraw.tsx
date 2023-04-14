import { Suspense } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";

const PreviewDraw = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer">
        <div className="">index </div>
      </DashBoardLayout>
    </Suspense>
  );
};

export default PreviewDraw;
