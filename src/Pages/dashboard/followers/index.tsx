import { Suspense } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import DrawsCard from "../../../components/DrawsCard/DrawsCard";
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

const Body = ({ title, data }: { title: string; data: any[] }) => {
  return (
    <div className="font-ubuntu  bg-bg rounded-[10px] p-[1rem] my-[1rem]">
      <h1 className="text-center md:text-left text-primary text-base font-bold lg:text-[1.25rem]  mb-[1rem]">
        {title}
      </h1>
      <div className="flex overflow-x-auto space-x-8 w-full mt-5">
        {data &&
          data.length > 0 &&
          data.map((item, i) => <DrawsCard key={i} {...item} />)}
      </div>
    </div>
  );
};
const index = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="follower">
        <Body data={data} title={"Top Performing Draws"} />
        <Body data={data} title={"Other Draws"} />
        <Body data={data} title={"Beauty Products"} />
      </DashBoardLayout>
    </Suspense>
  );
};

export default index;
