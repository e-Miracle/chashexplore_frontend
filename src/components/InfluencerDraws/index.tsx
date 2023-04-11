import React, { Suspense } from "react";
const DrawsTable = React.lazy(() => import("../Table"));
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
        <DrawsTable dataArr={dataArr} columnsArr={columnsArr} />
      </div>
    </Suspense>
  );
};

export default index;
