import React, { Suspense, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { Raffle } from "../../../assets";


const InflencerCards = lazy(
  () => import("../../../components/InflencerCards/indexAlt")
);
const InfluencerDraws = lazy(
  () => import("../../../components/InfluencerDraws/indexAlt")
);

export const data = [
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    audience: {
      min: 10000,
      max: 40000,
    },
    socials: {
      youtube: "https://www.youtube.com/?gl=NG",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/home",
      linkedIn: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com",
    },
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    audience: {
      min: 10000,
      max: 60000,
    },
    socials: {
      youtube: "https://www.youtube.com/?gl=NG",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/home",
      linkedIn: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com",
    },
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    audience: {
      min: 10000,
      max: 70000,
    },
    socials: {
      youtube: "https://www.youtube.com/?gl=NG",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/home",
      linkedIn: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com",
    },
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    audience: {
      min: 10000,
      max: 30000,
    },
    socials: {
      youtube: "https://www.youtube.com/?gl=NG",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/home",
      linkedIn: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com",
    },
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    audience: {
      min: 10000,
      max: 70000,
    },
    socials: {
      youtube: "https://www.youtube.com/?gl=NG",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/home",
      linkedIn: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com",
    },
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    audience: {
      min: 10000,
      max: 20000,
    },
    socials: {
      youtube: "https://www.youtube.com/?gl=NG",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/home",
      linkedIn: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com",
    },
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    audience: {
      min: 10000,
      max: 50000,
    },
    socials: {
      youtube: "https://www.youtube.com/?gl=NG",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/home",
      linkedIn: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com",
    },
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    audience: {
      min: 10000,
      max: 40000,
    },
    socials: {
      youtube: "https://www.youtube.com/?gl=NG",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/home",
      linkedIn: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com",
    },
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    audience: {
      min: 10000,
      max: 40000,
    },
    socials: {
      youtube: "https://www.youtube.com/?gl=NG",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/home",
      linkedIn: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com",
    },
  },
  {
    imgsrc: Raffle,
    name: "Genevieve Doe",
    email: "genevievedoe@gmail.com",
    audience: {
      min: 10000,
      max: 40000,
    },
    socials: {
      youtube: "https://www.youtube.com/?gl=NG",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/home",
      linkedIn: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com",
    },
  },
];

export const UserData = ({
  item,
  onClick,
}: {
  item: {
    imgsrc: string;
    name: string;
    email: string;
  };
  onClick?: (data:any) => void;
}) => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div
        onClick={() => onClick && onClick(item)}
        className="flex items-center bg-white rounded-[10px] mt-[1rem] p-[1rem] font-ubuntu hover:opacity-80 cursor-pointer"
      >
        <div className="w-[32px] h-[32px]">
          <img
            className="w-full h-full object-cover  rounded-full"
            src={item.imgsrc}
            alt={item.imgsrc}
            loading="lazy"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-heading text-sm lg:text-base font-black">
            {item.name}
          </h3>
          <p className="mt-1 text-[#A5A9B0] text-[10px] lg:text-[12px] ">
            {item.email}
          </p>
        </div>
      </div>
    </Suspense>
  );
};

const Body = ({ userData }: { userData: any[] }) => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className=" mt-[1rem] lg:mt-10 grid grid-cols-1 lg:grid-cols-6 gap-[1rem]  md:h-[calc(100vh-30vh)]">
        <div className="col-span-6 lg:col-span-4">
          {" "}
          <InfluencerDraws />
        </div>
        <div className="col-span-6 lg:col-span-2 flex flex-col justify-between h-full overflow-y-auto bg-bg p-[1rem] rounded-[10px]">
          <h2 className="text-primary  text-base capitalize font-semibold lg:text-lg">
            Pending Registrations
          </h2>
          {userData &&
            userData.length > 0 &&
            userData.map((item, i) => <UserData key={i} item={item} />)}{" "}
        </div>
      </div>
    </Suspense>
  );
};
const Transactions = () => {
  const cardProps = {
    raffles: 147,
    participants: 15,
    tickets: 20,
  };
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="admin">
        <InflencerCards {...cardProps} />
        <Body userData={data} />
      </DashBoardLayout>
    </Suspense>
  );
};

export default Transactions;
