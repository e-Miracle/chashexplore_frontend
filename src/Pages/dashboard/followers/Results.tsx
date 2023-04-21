import React, { Suspense, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { BackgroundDrop } from "../influencer/Profile";
import { Raffle, BlueLogo } from "../../../assets";
import ReviewCard from "../../../components/ReviewCard/ReviewCard";
const Table = lazy(() => import("../../../components/Table/WinnersTable"));
const reviewArr = [
  {
    text: "Absolutely unbelievable service from Ricky Crown! Easy to deal with a completely genuine! Still in shock that i won!",
    rating: 4,
    imgSrc: BlueLogo,
    username: "@johndoe2345",
    amount: 1000000,
  },
  {
    text: "Absolutely unbelievable service from Ricky Crown! Easy to deal with a completely genuine! Still in shock that i won!",
    rating: 4,
    imgSrc: BlueLogo,
    username: "@johndoe2345",
    amount: 1000000,
  },
  {
    text: "Absolutely unbelievable service from Ricky Crown! Easy to deal with a completely genuine! Still in shock that i won!",
    rating: 4,
    imgSrc: BlueLogo,
    username: "@johndoe2345",
    amount: 1000000,
  },
];
const dataArr = [
  {
    ticketId: "GN24809HN",
    price: 100000,
    username: "@johndoe235",
    number: "0803 *** 4567",
  },
  {
    ticketId: "GN24809HN",
    price: 100000,
    username: "@johndoe235",
    number: "0803 *** 4567",
  },
  {
    ticketId: "GN24809HN",
    price: 100000,
    username: "@johndoe235",
    number: "0803 *** 4567",
  },
  {
    ticketId: "GN24809HN",
    price: 100000,
    username: "@johndoe235",
    number: "0803 *** 4567",
  },
];
const columnsArr = [
  { Header: "Ticket ID", accessor: "ticketId" },
  { Header: "Prize", accessor: "price" },
  { Header: "Username", accessor: "username" },
  { Header: "Phone Number", accessor: "number" },
];
const Header = () => {
  return (
    <div className="flex flex-col  items-center md:flex-row justify-between">
      <h1
        className={
          "text-center md:text-left font-ubuntu text-heading font-medium lg:text-[1.5rem] text-[1.2rem]"
        }
      >
        100,000 naira New Year Giveaway!
      </h1>
      <p className=" text-center md:text-left mt-[1rem] md:mt-0 text-base lg:text-[1.25rem] text-labels">
        Date Ended: 25th February, 2023
      </p>
    </div>
  );
};

const Hero = () => {
  return (
    <div className=" mt-10 bg-white rounded-[10px] p-5 font-ubuntu flex flex-col md:flex-row items-center flex-wrap">
      <div className="w-full md:w-1/2">
        <h1 className="text-center md:text-left text-primary text-[1.2rem] lg:text-[1.5rem]">
          Raffle Drawn!!
        </h1>
        <p className="text-center md:text-left text-labels text-sm lg:text-base mt-5">
          This raffle ticket sale has ended and the raffle has been drawn. View
          winners below.
        </p>
      </div>
      <div className="w-full md:w-1/2 mt-[1rem] md:mt-0">
        <img
          src={Raffle}
          alt={Raffle}
          className="w-full  h-[292px] md:h[200px] object-cover shadow-new"
        />
      </div>
    </div>
  );
};

const Winners = () => {
  return (
    <div className="mt-10">
      <h1 className="text-center md:text-left text-primary text-[1.8rem] font-bold lg:text-[2rem] font-ubuntu">
        Winners
      </h1>
      <Table dataArr={dataArr} columnsArr={columnsArr} />
      <div className="my-[1rem] flex justify-center items-center">
        <button className=" w-full md:w-auto bg-primary text-white text-sm lg:text-base  py-3 px-10 my-5 rounded-[100px] cursor-pointer hover:opacity-80">
          View Draw Recap
        </button>
      </div>
    </div>
  );
};

const Reviews = () => {
  return (
    <div>
      <h1 className="text-center md:text-left text-primary text-[1.8rem] font-bold lg:text-[2rem] font-ubuntu  my-[3rem]">
        Reviews
      </h1>
      <div className="grid gap-[1rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[1rem] lg:mt-0">
        {reviewArr &&
          reviewArr.length > 0 &&
          reviewArr.map((item, i: number) => <ReviewCard key={i} {...item} />)}
      </div>
    </div>
  );
};

const Results = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="follower" backbtn={true}>
        <BackgroundDrop>
          <Header />
                  <Hero />
                  <Winners/>
          <Reviews />
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Results;
