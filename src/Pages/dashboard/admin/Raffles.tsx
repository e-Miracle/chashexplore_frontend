import React, { Suspense, useState, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { Raffle } from "../../../assets";
import { useMediaQuery } from "react-responsive";
import {
  faArrowCircleLeft,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nFormatter } from "../../../Utils";
const RafflesCard = lazy(() => import("../../../components/Raffles/Raffles"));
export const data = [
  {
    imgSrc: Raffle,
    title: "N100,000 New Year Giveaway",
    name: "Genevieve Doe2",
    ticketId: "#988234567",
    campaign: {
      start: {
        time: "08:00am",
        date: "25-01-2023",
      },
      stop: {
        time: "08:00pm",
        date: "30-01-2023",
      },
    },
    drawType: "Raffle Draw",
    noOfWinners: 3,
    description: `Lörem ipsum nisade homovålig. Parande megalig nylig. Protopi sant, vahär: ninde tyss. Spesas betreprende det vill säga dese.Anterangen ong nedärar. Timor neras innan os och plafäng.`,
    price: 4000,
  },
  {
    imgSrc: Raffle,
    title: "N100,000 New Year Giveaway",
    name: "Genevieve Doe3",
    ticketId: "#126864567",
    campaign: {
      start: {
        time: "08:00am",
        date: "25-01-2023",
      },
      stop: {
        time: "08:00pm",
        date: "30-01-2023",
      },
    },
    drawType: "Live Draw",
    noOfWinners: 3,
    description: `Lörem ipsum nisade homovålig. Parande megalig nylig. Protopi sant, vahär: ninde tyss. Spesas betreprende det vill säga dese.Anterangen ong nedärar. Timor neras innan os och plafäng.`,
    price: 4000,
  },
  {
    imgSrc: Raffle,
    title: "N100,000 New Year Giveaway",
    name: "Genevieve Doe4",
    ticketId: "#1235567",
    campaign: {
      start: {
        time: "08:00am",
        date: "25-01-2023",
      },
      stop: {
        time: "08:00pm",
        date: "30-01-2023",
      },
    },
    drawType: "Schedule Draw",
    noOfWinners: 3,
    description: `Lörem ipsum nisade homovålig. Parande megalig nylig. Protopi sant, vahär: ninde tyss. Spesas betreprende det vill säga dese.Anterangen ong nedärar. Timor neras innan os och plafäng.`,
    price: 7000,
  },
  {
    imgSrc: Raffle,
    title: "N100,000 New Year Giveaway",
    name: "Genevieve Doe7",
    ticketId: "#1284567",
    campaign: {
      start: {
        time: "08:00am",
        date: "25-01-2023",
      },
      stop: {
        time: "08:00pm",
        date: "30-01-2023",
      },
    },
    drawType: "Schedule  Draw",
    noOfWinners: 3,
    description: `Lörem ipsum nisade homovålig. Parande megalig nylig. Protopi sant, vahär: ninde tyss. Spesas betreprende det vill säga dese.Anterangen ong nedärar. Timor neras innan os och plafäng.`,
    price: 8000,
  },
  {
    imgSrc: Raffle,
    title: "N100,000 New Year Giveaway",
    name: "Genevieve Doe9",
    ticketId: "#1224567",
    campaign: {
      start: {
        time: "08:00am",
        date: "25-01-2023",
      },
      stop: {
        time: "08:00pm",
        date: "30-01-2023",
      },
    },
    drawType: "Live Draw",
    noOfWinners: 3,
    description: `Lörem ipsum nisade homovålig. Parande megalig nylig. Protopi sant, vahär: ninde tyss. Spesas betreprende det vill säga dese.Anterangen ong nedärar. Timor neras innan os och plafäng.`,
    price: 10000,
  },
  {
    imgSrc: Raffle,
    title: "N100,000 New Year Giveaway",
    name: "Genevieve Doe10",
    ticketId: "#1238567",
    campaign: {
      start: {
        time: "08:00am",
        date: "25-01-2023",
      },
      stop: {
        time: "08:00pm",
        date: "30-01-2023",
      },
    },
    drawType: "Live Draw",
    noOfWinners: 5,
    description: `Lörem ipsum nisade homovålig. Parande megalig nylig. Protopi sant, vahär: ninde tyss. Spesas betreprende det vill säga dese.Anterangen ong nedärar. Timor neras innan os och plafäng.`,
    price: 7000,
  },
  {
    imgSrc: Raffle,
    title: "N100,000 New Year Giveaway",
    name: "Genevieve Doe",
    ticketId: "#1234567",
    campaign: {
      start: {
        time: "08:00am",
        date: "25-01-2023",
      },
      stop: {
        time: "08:00pm",
        date: "30-01-2023",
      },
    },
    drawType: "Live Draw",
    noOfWinners: 10,
    description: `Lörem ipsum nisade homovålig. Parande megalig nylig. Protopi sant, vahär: ninde tyss. Spesas betreprende det vill säga dese.Anterangen ong nedärar. Timor neras innan os och plafäng.`,
    price: 9000,
  },
];

const Body = ({
  data,
  item,
  updateItem,
  isMobile,
  toggleState,
  updateState,
}: {
  data: any[];
  item: any;
  updateItem: any;
  isMobile: boolean;
  toggleState: boolean;
  updateState: any;
}) => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div className=" mt-[1rem] lg:mt-10 grid grid-cols-1 lg:grid-cols-6 gap-[1rem] font-ubuntu md:h-[calc(100vh-15vh)]">
        {!isMobile ? (
          <>
            <div className="col-span-6  lg:col-span-2 bg-bg p-[1rem] rounded-[10px] ">
              <h2 className="text-primary  text-base capitalize font-semibold lg:text-lg">
                Pending Raffles
              </h2>
              <div className="overflow-y-auto">
                {data &&
                  data.length > 0 &&
                  data.map((item, i) => (
                    <div onClick={() => isMobile && updateState()}>
                      <RafflesCard key={i} item={item} onClick={updateItem} />
                    </div>
                  ))}{" "}
              </div>
            </div>
            <div className="col-span-6 lg:col-span-4   overflow-y-auto p-[1rem] rounded-[10px] bg-bg ">
              <h2 className="text-primary  text-base capitalize font-semibold lg:text-lg">
                Pending Raffles
              </h2>
              <div className="mt-[1rem] bg-white rounded-[10px] h-full p-[1rem]  ">
                <div className="flex items-center  ">
                  <div className="w-[32px] h-[32px]">
                    <img
                      className="w-full h-full object-cover  rounded-full"
                      src={item.imgSrc}
                      alt={item.imgSrc}
                      loading="lazy"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-heading text-sm lg:text-base font-black">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[#A5A9B0] text-[10px] lg:text-[12px] ">
                      {item.ticketId}
                    </p>
                  </div>
                </div>
                <h3 className="text-labels text-sm lg:text-base my-[1.5rem]">
                  Audience Size:{" "}
                  <span className="bg-bg text-labelLight p-[1rem] rounded-[100px] ml-2">
                    Campaigner: {item.name}{" "}
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="ml-2 text-primary"
                    />
                  </span>
                </h3>

                <div>
                  <h3 className="text-primary text-sm lg:text-base font-extrabold">
                    Raffle Draw Details
                  </h3>

                  <h3 className="flex items-center text-heading text-sm lg:text-base font-extrabold my-2">
                    Campaign Start:{" "}
                    <span className="ml-1 text-labelLight font-normal">
                      Date: {item.campaign.start.date}
                    </span>{" "}
                    <span className="ml-1 text-labelLight font-normal">
                      Time: {item.campaign.start.time}
                    </span>
                  </h3>

                  <h3 className="flex items-center text-heading text-sm lg:text-base font-extrabold my-2">
                    Campaign Stop:{" "}
                    <span className="ml-1 text-labelLight font-normal">
                      Date: {item.campaign.stop.date}
                    </span>{" "}
                    <span className="ml-1 text-labelLight font-normal">
                      Time: {item.campaign.stop.time}
                    </span>
                  </h3>

                  <h3 className="flex items-center text-heading text-sm lg:text-base font-extrabold my-2">
                    Raffle Draw Type:{" "}
                    <span className="ml-1 text-labelLight font-normal">
                      {item.drawType}
                    </span>
                  </h3>

                  <h3 className="flex items-center text-heading text-sm lg:text-base font-extrabold my-2">
                    Number of winners:{" "}
                    <span className="ml-1 text-labelLight font-normal">
                      {nFormatter(item.noOfWinners, 3)}
                    </span>
                  </h3>
                  <h3 className="flex items-center text-heading text-sm lg:text-base font-extrabold my-2">
                    Description:
                  </h3>

                  <p className="text-sm lg:text-base text-labelLight font-normal my-2 leading-[2]">
                    {item.description}
                  </p>

                  <h3 className="text-primary text-sm lg:text-base font-extrabold mt-5">
                    Ticket Details
                  </h3>

                  <h3 className="flex items-center text-heading text-sm lg:text-base font-extrabold my-2">
                    Ticket Price:{" "}
                    <span className="ml-1 text-labelLight font-normal">
                      N{Number(item.price).toLocaleString()}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {toggleState ? (
              <>
                <div className="col-span-6  lg:col-span-2 bg-bg p-[1rem] rounded-[10px] ">
                  <h2 className="text-primary  text-base capitalize font-semibold lg:text-lg">
                    Pending Raffles
                  </h2>
                  <div className="overflow-y-auto">
                    {data &&
                      data.length > 0 &&
                      data.map((item, i) => (
                        <div onClick={() => isMobile && updateState()}>
                          <RafflesCard
                            key={i}
                            item={item}
                            onClick={updateItem}
                          />
                        </div>
                      ))}{" "}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-span-6 lg:col-span-4   overflow-y-auto p-[1rem] rounded-[10px] bg-bg ">
                  {isMobile && (
                    <button
                      onClick={() => updateState()}
                      className=" md:hidden bg-[#DBDDE2] text-primary hover:opacity-90 cursor-pointer  w-[24px] h-[24px] rounded-full"
                    >
                      <FontAwesomeIcon icon={faArrowCircleLeft} />
                    </button>
                  )}
                  <h2 className="text-primary  text-base capitalize font-semibold lg:text-lg">
                    Pending Raffles
                  </h2>
                  <div className="mt-[1rem] bg-white rounded-[10px] h-full p-[1rem]  ">
                    <div className="flex items-center  ">
                      <div className="w-[32px] h-[32px]">
                        <img
                          className="w-full h-full object-cover  rounded-full"
                          src={item.imgSrc}
                          alt={item.imgSrc}
                          loading="lazy"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-heading text-sm lg:text-base font-black">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[#A5A9B0] text-[10px] lg:text-[12px] ">
                          {item.ticketId}
                        </p>
                      </div>
                    </div>
                    <h3 className="flex items-center flex-wrap text-labels text-sm lg:text-base my-[1.5rem]">
                      Audience Size:{" "}
                      <span className="bg-bg text-labelLight p-[1rem] rounded-[100px] lg:ml-2 mt-2 lmd:mt-0">
                        Campaigner: {item.name}{" "}
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="ml-2 text-primary"
                        />
                      </span>
                    </h3>

                    <div>
                      <h3 className="text-primary text-sm lg:text-base font-extrabold">
                        Raffle Draw Details
                      </h3>

                      <h3 className="flex items-center flex-wrap text-heading text-sm lg:text-base font-extrabold my-2">
                        Campaign Start:{" "}
                        <span className="w-full md:w-auto lg:ml-1 text-labelLight font-normal">
                          Date: {item.campaign.start.date}
                        </span>{" "}
                        <span className="w-full md:w-auto lg:ml-1 text-labelLight font-normal">
                          Time: {item.campaign.start.time}
                        </span>
                      </h3>

                      <h3 className="flex items-center flex-wrap text-heading text-sm lg:text-base font-extrabold my-2">
                        Campaign Stop:{" "}
                        <span className="w-full md:w-auto lg:ml-1 text-labelLight font-normal">
                          Date: {item.campaign.stop.date}
                        </span>{" "}
                        <span className="w-full md:w-auto lg:ml-1 text-labelLight font-normal">
                          Time: {item.campaign.stop.time}
                        </span>
                      </h3>

                      <h3 className="flex items-center flex-wrap text-heading text-sm lg:text-base font-extrabold my-2">
                        Raffle Draw Type:{" "}
                        <span className="ml-1 text-labelLight font-normal">
                          {item.drawType}
                        </span>
                      </h3>

                      <h3 className="flex items-center flex-wrap text-heading text-sm lg:text-base font-extrabold my-2">
                        Number of winners:{" "}
                        <span className="ml-1 text-labelLight font-normal">
                          {nFormatter(item.noOfWinners, 3)}
                        </span>
                      </h3>
                      <h3 className="flex items-center text-heading text-sm lg:text-base font-extrabold my-2">
                        Description:
                      </h3>

                      <p className="text-sm lg:text-base text-labelLight font-normal my-2 leading-[2]">
                        {item.description}
                      </p>

                      <h3 className="text-primary text-sm lg:text-base font-extrabold mt-5">
                        Ticket Details
                      </h3>

                      <h3 className="flex items-center flex-wrap text-heading text-sm lg:text-base font-extrabold my-2">
                        Ticket Price:{" "}
                        <span className="ml-1 text-labelLight font-normal">
                          N{Number(item.price).toLocaleString()}
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Suspense>
  );
};
const Raffles = () => {
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  const [item, setItem] = useState(data[0]);
  const [toggleState, setToggleState] = useState<boolean>(true);
  const updateState = () => setToggleState(!toggleState);
  const updateItem = (item: any) => {
    setItem(item);
  };
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="admin" backbtn={true}>
        <Body
          item={item}
          data={data}
          updateItem={updateItem}
          isMobile={isMobile}
          toggleState={toggleState}
          updateState={updateState}
        />
      </DashBoardLayout>
    </Suspense>
  );
};

export default Raffles;
