import React, { Suspense, useState } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { BackgroundDrop } from "../influencer/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPen,
  faEye,
  faEyeSlash,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { nFormatter } from "../../../Utils";
import { Raffle } from "../../../assets";

const DrawsCard = React.lazy(
  () => import("../../../components/DrawsCard/DrawsCard")
);
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

export const Header = () => {
  type socialCta = { imgUrl: string; cta: string; color?: string };
//   const socailCta: socialCta[] = [
//     { imgUrl: Google, cta: "" },
//     { imgUrl: Twitter, cta: "", color: "#1D9BF0" },
//     { imgUrl: Facebook, cta: "", color: "#1877F2" },
//     { imgUrl: LinkedIn, cta: "", color: "#0A66C2" },
//     { imgUrl: Instagram, cta: "" },
//   ];
  return (
    <div className="flex flex-wrap font-ubuntu ">
      <div className="w-full md:w-[80%] flex ">
        <div className=" hidden lg:block relative  w-[70px] h-[70px] lg:w-[120px]   lg:h-[120px] p-1 rounded-full border-[7px] border-primary border-r-white relative">
          <img
            className="  w-full h-full object-cover rounded-full "
            src={"https://via.placeholder.com/100x100"}
            alt="Image Alt"
          />
          <span className="  w-[10px] h-[10px] lg:w-[15px] lg:h-[15px] bg-green rounded-full absolute right-1 bottom-2"></span>
        </div>
        <div className="lg:ml-5 w-full lg:w-[80%] ">
          <div className=" flex items-center w-full">
            <h3 className="text-labels text-[1.5rem] lg:text-[2rem]">
              Genevieve Doe{" "}
              <FontAwesomeIcon icon={faCheckCircle} className="text-primary" />{" "}
            </h3>
            <button className="ml-3 lg:ml-10 text-[#797F8A] text-[1.5rem] lg:text-[2rem] cursor-pointer hover:opacity-90">
              <FontAwesomeIcon icon={faPen} />
            </button>
          </div>

          <p className="text-icon text-sm lg:text-base rounded-[100px] bg-[#F4F6F8] px-7 py-3 text-center mt-3">
            genevievedoe@gmail.com
          </p>
        </div>
      </div>
      <div className="w-full md:w-[0%] mt-5 lg:mt-0 ">
        {/* {" "}
        <p className="text-[#000] text-sm lg:text-base text-center md:text-left">
          Connect with me:
        </p>
        <div className="flex flex-wrap justify-center md:justify-start  items-center  mt-[3rem]">
          {socailCta.map((item: socialCta, i: number) => (
            <button
              className="hover:opacity-80 rounded-full shadow-primary p-2 flex justify-center items-center ml-0 mr-2"
              key={i}
              style={{ background: item?.color }}
            >
              {" "}
              <LazyLoadImage
                className="w-[20px] md:w-[30px] h-[20px] md:h-[30px] object-contain"
                src={item.imgUrl}
                placeholderSrc={"https://via.placeholder.com/72x72"}
                alt={item.imgUrl}
              />
            </button>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export const ActiveDraws = ({ data }: { data: any[] }) => {
  const [visible, setVisbility] = useState<boolean>(false);
  return (
    <div className="w-full bg-bg rounded-[10px] p-[1rem] font-ubuntu">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setVisbility(!visible)}
      >
        <h3 className="text-primary text-base lg:text-[1.25rem] font-semibold">
          Active Draws
        </h3>
        <button>
          <FontAwesomeIcon
            icon={visible ? faArrowUp : faArrowDown}
            className="text-[#646C79]"
          />
        </button>
      </div>
      {visible && (
        <div className="flex overflow-x-auto space-x-8 w-full mt-5">
          {data &&
            data.length > 0 &&
            data.map((item, i) => <DrawsCard key={i} {...item} />)}
        </div>
      )}
    </div>
  );
};

export const InActiveDraws = ({ data }: { data: any[] }) => {
  const [visible, setVisibility] = useState<boolean>(false);
  return (
    <div className="w-full bg-bg rounded-[10px] p-[1rem] font-ubuntu mt-[1rem]">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setVisibility(!visible)}
      >
        <h3 className="text-primary text-base lg:text-[1.25rem] font-semibold">
          Inactive Draws
        </h3>
        <button>
          <FontAwesomeIcon
            icon={visible ? faArrowUp : faArrowDown}
            className="text-[#646C79]"
          />
        </button>
      </div>
      {visible && (
        <div className="flex overflow-x-auto space-x-8 w-full mt-5">
          {data &&
            data.length > 0 &&
            data.map((item, i) => <DrawsCard key={i} {...item} />)}
        </div>
      )}
    </div>
  );
};

const Body = ({ balance, data }: { balance: number; data: any[] }) => {
  const [visible, setVisbility] = useState<boolean>(false);
  return (
    <div className=" bg-white mt-[1rem] lg:mt-10 grid grid-cols-1 lg:grid-cols-6 gap-[1rem]  md:h-[calc(100vh-30vh)] font-ubuntu">
      <div className="col-span-6 lg:col-span-4">
        <ActiveDraws data={data} />
        <InActiveDraws data={data} />
      </div>
      <div className="col-span-6 lg:col-span-2 bg-bg rounded-[10px] p-[1rem] ">
        <h3 className="text-heading text-[1.2rem] lg:text-[1.5rem]">
          Wallet Details
        </h3>

        <div className="bg-white mt-5 p-[1rem] rounded-[10px] relative">
          <p className="text-[#8E939D] text-base text-[1.25rem]">
            Wallet Balance:
          </p>
          <h2 className="text-primary text-[1.8rem] text-[2rem] mt-3">
            {visible ? ` ₦ ${nFormatter(balance, 3)}` : "********"}
          </h2>
          <button
            className="absolute right-2 bottom-2"
            onClick={() => setVisbility(!visible)}
          >
            {" "}
            <FontAwesomeIcon
              icon={visible ? faEye : faEyeSlash}
              className="text-[#8E939D]"
            />
          </button>
        </div>
        <div className="flex justify-center items-center mt-3">
          <button className=" bg-primary text-[#fff] text-sm lg:text-base outline-none  py-5 px-8 mt-5 rounded-[100px] cursor-pointer hover:opacity-80">
            Withdraw Balance
          </button>
        </div>
      </div>
    </div>
  );
};
const Profile = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="follower">
        <BackgroundDrop>
          <Header />
          <Body data={data} balance={100000000} />
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Profile;
