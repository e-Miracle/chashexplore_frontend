import React, { Suspense, useState } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { BackgroundDrop } from "../influencer/Profile";
import { Title } from "./Draws";
import DrawsCard from "../../../components/DrawsCard/DrawsCardAlt2";
import { Raffle } from "../../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
const data = [
  {
    imgSrc: Raffle,
    status: "Pending",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 1,
    ticketId: "GN24812ER",
  },
  {
    imgSrc: Raffle,
    status: "Pending",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 2,
    ticketId: "GN24806DF",
  },
  {
    imgSrc: Raffle,
    status: "Pending",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 3,
    ticketId: "GN24805GH",
  },
  {
    imgSrc: Raffle,
    status: "Pending",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 4,
    ticketId: "GN24809YM",
  },
  {
    imgSrc: Raffle,
    status: "Pending",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 5,
    ticketId: "GN24809HN",
  },
];

const UserDraws = ({ text, data }: { text: string; data: any[] }) => {
  const [visible, setVisbility] = useState<boolean>(true);
  return (
    <div className="w-full bg-bg rounded-[10px] p-[1rem] font-ubuntu">
      <button onClick={() => setVisbility(!visible)}>
        <h3 className="text-[#4E5767] text-base lg:text-[1.25rem] font-semibold">
          {text}{" "}
          <FontAwesomeIcon
            icon={visible ? faArrowUp : faArrowDown}
            className="text-[#646C79]"
          />
        </h3>
      </button>
      {visible && (
        <div className="grid gap-[1rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[1rem] lg:mt-0">
          {data &&
            data.length > 0 &&
            data.map((item, i) => <DrawsCard key={i} {...item} />)}
        </div>
      )}
    </div>
  );
};
const Transactions = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="follower" backbtn={true}>
        <Title text="My Tickets" />
        <BackgroundDrop>
          {" "}
          <UserDraws text="Active Draws" data={data} />
          <UserDraws text="Inactive  Draws" data={data} />
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Transactions;
