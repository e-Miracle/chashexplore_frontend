import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { faPlus, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PrizeDraw } from "../../../assets";
import { _INFLUENCER_ } from "../../../constants";
const DrawsTable = React.lazy(() => import("../../../components/Table"));
const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-primary font-ubuntu text-[1.5rem] lg:text-[2rem]">
        My Draws
      </h2>
      <Link
        to={`/${_INFLUENCER_}/my/draws/create`}
        className="bg-primary text-white rounded-[100px] p-5 hover:opacity-90"
      >
        {" "}
        <FontAwesomeIcon icon={faPlus} className="mr-2 " /> Create New Draw
      </Link>
    </div>
  );
};

const Body = () => {
  const draws: string[] = ["active", "inactive", "pending"];
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
   dataArr.length = 0;
   const columnsArr = [
     { Header: "Campaign Name", accessor: "campaign" },
     { Header: "Tickets Sold", accessor: "tickets" },
     { Header: "Amount Raised", accessor: "amounts" },
   ];
  return (
    <div className=" mt-[1rem] lg:mt-10 bg-bg md:h-[calc(100vh-20vh)] p-[1rem] lg:p-[2rem] rounded-[10px] ">
      <select
        className="font-ubuntu capitalize bg-bg text-[#4E5767]  text-[1.2rem] lg:text-[1.5rem] outline-none"
        onChange={() => {
          //rerun query here
        }}
      >
        {draws.map((item, i) => (
          <option className="text-sm lg:text-base" key={i} value={item}>
            {item} draws <FontAwesomeIcon icon={faArrowDown} />
          </option>
        ))}
      </select>
      <>
        {dataArr && dataArr.length > 0 ? (
          <DrawsTable dataArr={dataArr} columnsArr={columnsArr} />
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <LazyLoadImage
              className="  w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]  my-[1rem]  object-contain"
              src={PrizeDraw}
              placeholderSrc={"https://via.placeholder.com/100x100"}
              alt={PrizeDraw}
            />

            <p className="font-ubuntu text-base lg:text-lg text-center my-[3rem] text-[#0D1A31] mt-5">
              Your top performing raffle draws appear here. Start creating
              awesome and exciting raffle draws for your audience.
            </p>
          </div>
        )}
      </>
    </div>
  );
};
const Draws = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="influencer">
        <div className="">
          <Header />
          <Body />
        </div>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Draws;
