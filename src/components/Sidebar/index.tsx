import React, { Suspense } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Logo } from "../../assets";
import { useMediaQuery } from "react-responsive";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  _FOLLOWER_,
  _INFLUENCER_,
  _ADMIN_,
  dashBoardLinks,
  adminDashBoardLinks,
  followersdashBoardLinks,
} from "../../constants";
import { useNavigate } from "react-router-dom";

const SideBarLink = React.lazy(() => import("../SideBarLink"));

type Props = {
  mobileNav: boolean;
  expand: boolean;
  userImg?: string;
  type: "influencer" | "follower" | "admin";
};

const Index: React.FC<Props> = ({ mobileNav, expand, userImg, type }) => {
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  const navigate = useNavigate();
  return (
    <Suspense>
      <div
        className={
          isMobile
            ? mobileNav
              ? " bottom-0 overflow-x-hidden overflow-y-auto -translate-x-[40%]  absolute right-0 top-0 h-screen bg-primary text-white flex flex-col justify-evenly items-center w-[calc(100%-30vw)] lg:w-full ease-in duration-300 z-[99]"
              : "-translate-x-[100%] lg:translate-x-[0%] w-[18rem] bg-primary text-white fixed top-0 bottom-0 overflow-x-hidden overflow-y-auto ease-in duration-300 z-[99]"
            : expand
            ? "  w-[6rem] bg-primary text-white fixed top-0 bottom-0 overflow-x-hidden overflow-y-auto ease-in duration-300 z-[99]"
            : "-translate-x-[100%] lg:translate-x-[0%] w-[18rem] bg-primary text-white fixed top-0 bottom-0 overflow-x-hidden overflow-y-auto ease-in duration-300 z-[99]"
        }
      >
        <div className="flex justify-center items-center ">
          {expand ? (
            <LazyLoadImage
              className=" px-4  w-[100%] h-[50px] my-[1rem]  object-contain"
              src={Logo}
              placeholderSrc={"https://via.placeholder.com/100x100"}
              alt="Image Alt"
            />
          ) : (
            <LazyLoadImage
              className="  w-[100px] lg:w-[150px] h-[50px] my-[1rem] lg:h-[70px] object-contain"
              src={Logo}
              placeholderSrc={"https://via.placeholder.com/100x100"}
              alt="Image Alt"
            />
          )}
        </div>

        <ul className="flex flex-col justify-center items-center w-full">
          {type === "influencer" &&
            dashBoardLinks &&
            dashBoardLinks.map((link, i) => (
              <SideBarLink
                key={i}
                isIconMode={expand}
                Icon={link.icon}
                {...link}
                path={link.path}
              />
            ))}

          {type === _FOLLOWER_ &&
            followersdashBoardLinks &&
            followersdashBoardLinks.map((link, i) => (
              <SideBarLink
                key={i}
                isIconMode={expand}
                Icon={link.icon}
                {...link}
                path={link.path}
              />
            ))}

          {type === _ADMIN_ &&
            adminDashBoardLinks &&
            adminDashBoardLinks.map((link, i) => (
              <SideBarLink
                key={i}
                isIconMode={expand}
                Icon={link.icon}
                {...link}
                path={link.path}
              />
            ))}
        </ul>

        <div className="mt-2 flex flex-col justify-center items-center ">
          {!expand && (
            <div
              onClick={() => navigate(`/my/dashboard/${type}/profile`)}
              className="  w-[70px] lg:w-[100px] h-[70px] my-[1rem] lg:h-[100px] p-2 rounded-full border-[5px] border-[#fff] border-r-primary relative cursor-pointer hover:opacity-80"
            >
              <LazyLoadImage
                className="  w-full h-full object-cover rounded-full "
                src={userImg ? userImg : "https://via.placeholder.com/100x100"}
                placeholderSrc={"https://via.placeholder.com/100x100"}
                alt="Image Alt"
              />
            </div>
          )}

          {expand ? (
            <button className=" outline-none pl-9 mt-10 flex justify-start text-2xl  w-full  text-white my-[1rem] hover:opacity-80 ">
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          ) : (
            <button className=" ml-[-1.5rem] font-ubuntu my-[1rem] text-base lg:text-[1.25rem] hover:opacity-80 ">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Logout
            </button>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Index;
