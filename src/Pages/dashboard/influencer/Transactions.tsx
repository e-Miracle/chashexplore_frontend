import React, { Suspense, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { BackgroundDrop } from "./Profile";
const Table = lazy(() => import("../../../components/Table/TransactionTable"));
const Transactions = () => {
  const dataArr = [
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
      total: 1800000,
      payout: 1800000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
      total: 1800000,
      payout: 1800000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
      total: 1800000,
      payout: 1800000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
      total: 1800000,
      payout: 1800000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
      total: 1800000,
      payout: 1800000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
      total: 1800000,
      payout: 1800000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
      total: 1800000,
      payout: 1800000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
      total: 1800000,
      payout: 1800000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
      total: 1800000,
      payout: 1800000,
    },
    {
      campaign: "500,000naira New Year Giveaway",
      tickets: 1600,
      amounts: 2808000,
      total: 1800000,
      payout: 1800000,
    },
  ];
  const columnsArr = [
    { Header: "Campaign Name", accessor: "campaign" },
    { Header: "Tickets Sold", accessor: "tickets" },
    { Header: "Amount Raised", accessor: "amounts" },
    { Header: "Total Prize(00%)", accessor: "total" },
    { Header: "Organizer Payout(00%)", accessor: "payout" },
  ];
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer">
        <h1 className="text-primary font-ubuntu text-[1.8rem] lg:text-[2rem] text-center md:text-left">
          Transactions
        </h1>
        <BackgroundDrop>
          {dataArr && dataArr.length > 0 && (
            <Table dataArr={dataArr} columnsArr={columnsArr} />
          )}
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Transactions;
