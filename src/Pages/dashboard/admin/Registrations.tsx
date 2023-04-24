import { Suspense, useState, lazy } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { data } from ".";
import {
  faInstagram,
  faTwitter,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nFormatter } from "../../../Utils";
import { useMediaQuery } from "react-responsive";
const Influencer = lazy(() =>
  import("./index").then((res) => {
    return {
      default: res.UserData,
    };
  })
);
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
      <div className=" mt-[1rem] lg:mt-10 grid grid-cols-1 lg:grid-cols-6 gap-[1rem] font-ubuntu ">
        {!isMobile ? (
          <>
            <div className="col-span-6  lg:col-span-2 bg-bg p-[1rem] rounded-[10px]">
              <h2 className="text-primary  text-base capitalize font-semibold lg:text-lg">
                Pending Registrations fstrstr
              </h2>
              {data &&
                data.length > 0 &&
                data.map((item, i) => (
                  <div onClick={() => isMobile && updateState()}>
                    <Influencer key={i} item={item} onClick={updateItem} />
                  </div>
                ))}{" "}
            </div>
            <div className="col-span-6 lg:col-span-4   overflow-y-auto p-[1rem] rounded-[10px] bg-bg ">
              <h2 className="text-primary  text-base capitalize font-semibold lg:text-lg">
                Pending Registrations
              </h2>
              <div className="mt-[1rem] bg-white rounded-[10px] h-full p-[1rem]  ">
                <div className="flex items-center  ">
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
                <h3 className="text-labels text-sm lg:text-base my-[1.5rem]">
                  Audience Size:{" "}
                  <span className="bg-bg text-labelLight p-[1rem] rounded-[100px] ml-2">
                    {nFormatter(item.audience.min, 3)} -{" "}
                    {nFormatter(item.audience.max, 3)}
                  </span>
                </h3>

                <div className="my-[3rem]">
                  <h3 className="text-heading font-black  text-sm lg:text-base">
                    Social Media Profiles
                  </h3>
                  <div className="flex items-center overflow-x-auto overflow-y-hidden my-[1rem]">
                    <a
                      href={item.socials.facebook}
                      className="flex  items-center flex-shrink-0 rounded-[100px] bg-bg text-labelLight p-[1rem] lg:w-[135px] hover:text-white hover:bg-primary"
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="mr-3 text-2xl"
                      />{" "}
                      facebook
                    </a>
                    <a
                      href={item.socials.instagram}
                      className="ml-5 flex items-center flex-shrink-0 rounded-[100px] bg-bg text-labelLight p-[1rem] lg:w-[135px] hover:text-white hover:bg-primary"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="mr-3 text-2xl"
                      />{" "}
                      Instagram
                    </a>
                    <a
                      href={item.socials.twitter}
                      className="ml-5 flex items-center flex-shrink-0 rounded-[100px] bg-bg text-labelLight p-[1rem] lg:w-[135px] hover:text-white hover:bg-primary"
                    >
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="mr-3 text-2xl"
                      />{" "}
                      Twitter
                    </a>
                    <a
                      href={item.socials.linkedIn}
                      className="ml-5 flex items-center flex-shrink-0 rounded-[100px] bg-bg text-labelLight p-[1rem] lg:w-[135px] hover:text-white hover:bg-primary"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="mr-3 text-2xl"
                      />{" "}
                      LinkedIn
                    </a>
                    <a
                      href={item.socials.linkedIn}
                      className="ml-5 flex items-center flex-shrink-0 rounded-[100px] bg-bg text-labelLight p-[1rem] lg:w-[135px] hover:text-white hover:bg-primary"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="mr-3 text-2xl"
                      />{" "}
                      LinkedIn
                    </a>
                  </div>
                </div>
                <div className="p-[1rem] rounded-[10px] text-[#8E939D] h-[200px] bg-bg">
                  loading...
                </div>
                <div className="lg:flex lg:justify-end lg:item-end">
                  <button className=" w-full md:w-auto border-2 border-primary text-primary text-sm lg:text-base  py-3 px-10 my-2 rounded-[100px] cursor-pointer hover:opacity-80">
                    Reject
                  </button>
                  <button className=" lg:ml-5 w-full md:w-auto border-2 border-primary bg-primary text-white text-sm lg:text-base  py-3 px-10 my-2 rounded-[100px] cursor-pointer hover:opacity-80">
                    Verify Account
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {toggleState ? (
              <>
                <div className="col-span-6  lg:col-span-2 bg-bg p-[1rem] rounded-[10px]">
                  <h2 className="text-primary  text-base capitalize font-semibold lg:text-lg">
                    Pending Registrations
                  </h2>
                  {data &&
                    data.length > 0 &&
                    data.map((item, i) => (
                      <div onClick={() => isMobile && updateState()}>
                        <Influencer key={i} item={item} onClick={updateItem} />
                      </div>
                    ))}{" "}
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
                    Pending Registrations
                  </h2>
                  <div className="mt-[1rem] bg-white rounded-[10px] h-full p-[1rem]  ">
                    <div className="flex items-center  ">
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
                    <h3 className="text-labels text-sm lg:text-base my-[1.5rem]">
                      Audience Size:{" "}
                      <span className="bg-bg text-labelLight p-[1rem] rounded-[100px] ml-2">
                        {nFormatter(item.audience.min, 3)} -{" "}
                        {nFormatter(item.audience.max, 3)}
                      </span>
                    </h3>

                    <div className="my-[3rem]">
                      <h3 className="text-heading font-black  text-sm lg:text-base">
                        Social Media Profiles
                      </h3>
                      <div className="flex items-center overflow-x-auto overflow-y-hidden my-[1rem]">
                        <a
                          href={item.socials.facebook}
                          className="flex  items-center flex-shrink-0 rounded-[100px] bg-bg text-labelLight p-[1rem] lg:w-[135px] hover:text-white hover:bg-primary"
                        >
                          <FontAwesomeIcon
                            icon={faFacebook}
                            className="mr-3 text-2xl"
                          />{" "}
                          facebook
                        </a>
                        <a
                          href={item.socials.instagram}
                          className="ml-5 flex items-center flex-shrink-0 rounded-[100px] bg-bg text-labelLight p-[1rem] lg:w-[135px] hover:text-white hover:bg-primary"
                        >
                          <FontAwesomeIcon
                            icon={faInstagram}
                            className="mr-3 text-2xl"
                          />{" "}
                          Instagram
                        </a>
                        <a
                          href={item.socials.twitter}
                          className="ml-5 flex items-center flex-shrink-0 rounded-[100px] bg-bg text-labelLight p-[1rem] lg:w-[135px] hover:text-white hover:bg-primary"
                        >
                          <FontAwesomeIcon
                            icon={faTwitter}
                            className="mr-3 text-2xl"
                          />{" "}
                          Twitter
                        </a>
                        <a
                          href={item.socials.linkedIn}
                          className="ml-5 flex items-center flex-shrink-0 rounded-[100px] bg-bg text-labelLight p-[1rem] lg:w-[135px] hover:text-white hover:bg-primary"
                        >
                          <FontAwesomeIcon
                            icon={faLinkedin}
                            className="mr-3 text-2xl"
                          />{" "}
                          LinkedIn
                        </a>
                        <a
                          href={item.socials.linkedIn}
                          className="ml-5 flex items-center flex-shrink-0 rounded-[100px] bg-bg text-labelLight p-[1rem] lg:w-[135px] hover:text-white hover:bg-primary"
                        >
                          <FontAwesomeIcon
                            icon={faLinkedin}
                            className="mr-3 text-2xl"
                          />{" "}
                          LinkedIn
                        </a>
                      </div>
                    </div>
                    <div className="p-[1rem] rounded-[10px] text-[#8E939D] h-[200px] bg-bg">
                      loading...
                    </div>
                    <div className="lg:flex lg:justify-end lg:item-end">
                      <button className=" w-full md:w-auto border-2 border-primary text-primary text-sm lg:text-base  py-3 px-10 my-2 rounded-[100px] cursor-pointer hover:opacity-80">
                        Reject
                      </button>
                      <button className=" lg:ml-5 w-full md:w-auto border-2 border-primary bg-primary text-white text-sm lg:text-base  py-3 px-10 my-2 rounded-[100px] cursor-pointer hover:opacity-80">
                        Verify Account
                      </button>
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
const Registrations = () => {
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

export default Registrations;
