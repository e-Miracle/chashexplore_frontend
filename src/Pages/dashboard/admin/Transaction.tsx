import React, { Suspense, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { _FOLLOWER_, _INFLUENCER_, _ADMIN_ } from "../../../constants";
// const Table = lazy(() => import("../../../components/Table/TransactionTable"));
const BackgroundDrop = React.lazy(() =>
  import("../influencer/Profile").then((res) => {
    return {
      default: res.BackgroundDrop,
    };
  })
);

const Table = ({ data, type }: { data: any[]; type: string }) => {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className="relative overflow-x-auto  sm:rounded-lg font-ubuntu">
        <table className="w-full bg-bg text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-labelLight uppercase bg-bg ">
            <tr className="h-[70px]">
              <th scope="col" className="text-left  py-3">
                Campaign Name
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Tickets Sold
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Amount Raised
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Total Prize(00%)
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Organizer Payout(00%)
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((item, i: number) => (
                <tr
                  key={i}
                  className="bg-white hover:opacity-80 cursor-pointer h-[100px] mx-5"
                  onClick={() =>
                    navigate(`/${type}/my/transactions/transaction/${i}`)
                  }
                >
                  <th
                    scope="row"
                    className=" py-4 font-medium  text-heading whitespace-nowrap text-left "
                  >
                    <span className="w-[6px] h-[6px] rounded-full bg-[#FD1826] mx-2 inline-block"></span>{" "}
                    {item.campaign}
                  </th>
                  <td className="px-6 py-4 text-heading text-center">
                    {item.tickets}
                  </td>
                  <td className="px-6 py-4 text-heading text-center">
                    {item.amounts}
                  </td>
                  <td className="px-6 py-4 text-heading text-center">
                    {item.total}
                  </td>
                  <td className="px-6 py-4 text-heading text-center">
                    {item.payout}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
};
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
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="admin">
        <h1 className="text-primary font-ubuntu text-[1.8rem] lg:text-[2rem] text-center md:text-left">
          Transactions
        </h1>
        <BackgroundDrop>
          {dataArr && dataArr.length > 0 && (
            <Table data={dataArr} type={_ADMIN_} />
          )}
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Transactions;
