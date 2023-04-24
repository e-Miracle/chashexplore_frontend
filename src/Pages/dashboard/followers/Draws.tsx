import React, { Suspense, useState } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { BackgroundDrop } from "../influencer/Profile";
import DrawsCard from "../../../components/DrawsCard/DrawsCardAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Raffle } from "../../../assets";

const data = [
  {
    imgSrc: Raffle,
    name: "Genevieve Doe",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 1,
    price: 150,
  },
  {
    imgSrc: Raffle,
    name: "Genevieve Doe",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 2,
    price: 150,
  },
  {
    imgSrc: Raffle,
    name: "Genevieve Doe",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 3,
    price: 150,
  },
  {
    imgSrc: Raffle,
    name: "Genevieve Doe",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 4,
    price: 150,
  },
  {
    imgSrc: Raffle,
    name: "Genevieve Doe",
    title: "500,000naira New Year Giveaway",
    endIn: "14:48:27",
    id: 5,
    price: 150,
  },
];
export const Title = ({ text }: { text: string }) => {
  return (
    <h2 className="text-primary font-ubuntu text-[1.5rem] lg:text-[2rem] capitalize">
      {text}
    </h2>
  );
};

const UserDraws = ({ text, data }: { text: string; data: any[] }) => {
  const [visible, setVisbility] = useState<boolean>(true);
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className="w-full bg-bg rounded-[10px] p-[1rem] font-ubuntu">
        <button onClick={() => setVisbility(!visible)}>
          <h3 className="text-primary text-base lg:text-[1.25rem] font-semibold">
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
    </Suspense>
  );
};
const Draws = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="follower">
        <Title text="My Draws" />
        <BackgroundDrop>
          <UserDraws text="Active Draws" data={data} />
          <UserDraws text="Inactive  Draws" data={data} />
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Draws;
