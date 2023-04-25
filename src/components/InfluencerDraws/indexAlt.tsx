import React, { Suspense } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { EmptyDraw } from "../../assets";
const DrawsTable = React.lazy(() => import("../Table/IndexAlt"));

const index = () => {
  const dataArr = [
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
    },
  ];
  // dataArr.length = 0;
  const columnsArr = [
    { Header: "Campaign Name", accessor: "campaign" },
    { Header: "Tickets Sold", accessor: "tickets" },
    { Header: "Amount Raised", accessor: "amounts" },
  ];
  return (
    <Suspense>
      <div className="bg-secondary rounded-[10px] p-5 h-full">
        <h2 className="text-primary  text-base capitalize font-semibold lg:text-lg">
          Top Performing Draws
        </h2>
        {dataArr && dataArr.length > 0 ? (
          <DrawsTable dataArr={dataArr} columnsArr={columnsArr} />
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <LazyLoadImage
              className="  w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]  my-[1rem]  object-contain"
              src={EmptyDraw}
              placeholderSrc={"https://via.placeholder.com/100x100"}
              alt={EmptyDraw}
            />

            <p className="font-ubuntu text-base lg:text-lg text-center my-[3rem] text-[#0D1A31] mt-5">
              Your top performing raffle draws appear here. Start creating
              awesome and exciting raffle draws for your audience.
            </p>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default index;
