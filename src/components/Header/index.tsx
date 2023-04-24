import React, { Suspense } from "react";
import {
  faHamburger,
  faBell,
  faSearch,
  faBars,
  faTimes,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
type Props = {
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  mobileNav: boolean;
  handleMobileNav?: () => void;
  type: "influencer" | "follower" | "admin";
};

const index: React.FC<Props> = ({
  expand,
  setExpand,
  mobileNav,
  handleMobileNav,
  type,
}) => {
  const location = useLocation();
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  return (
    <Suspense>
      <div className="flex px-2 md:px-0 justify-between items-center py-[1rem] bg-white">
        <div className={" flex items-center  "}>
          <button
            className=" hidden lg:block text-icon text-2xl mr-5 hover:opacity-80 ease-in duration-300 "
            onClick={() => setExpand(!expand)}
          >
            <FontAwesomeIcon icon={expand ? faTimes : faBars} />
          </button>
          {type === "admin" ? (
            <h1
              className={
                "font-ubuntu text-heading font-medium lg:text-[1.5rem] text-[1.2rem] ml-2 lg:ml-0"
              }
            >
              Hello Admin &#128075;
            </h1>
          ) : (
            <h1
              className={
                "font-ubuntu text-heading font-medium lg:text-[1.5rem] text-[1.2rem] ml-2 lg:ml-0"
              }
            >
              {location.pathname.includes("dashboard") ? (
                <>{isMobile ? "Hello" : "Hello Genevieve"} &#128075;</>
              ) : (
                <>
                  {isMobile
                    ? "Genevieve Doe".substring(0, 3) + "..."
                    : "Genevieve Doe"}{" "}
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-primary"
                  />
                </>
              )}
            </h1>
          )}
        </div>

        <div className="flex items-center">
          <div className="flex items-center">
            <Link
              to="/my/dashbaord/search"
              className="text-icon lg:text-2xl mr-5 text-xl hover:opacity-80 ease-in duration-300"
            >
              <FontAwesomeIcon icon={faSearch} />
            </Link>

            <Link
              to={`/${type}/my/notifications`}
              className="mr-5 text-icon lg:text-2xl text-xl hover:opacity-80 ease-in duration-300"
            >
              <FontAwesomeIcon icon={faBell} />
            </Link>
          </div>
          <button
            role="button"
            onClick={handleMobileNav}
            className="block lg:hidden  text-icon text-xl lg:text-2xl mr-5 hover:opacity-80 ease-in duration-300"
          >
            <FontAwesomeIcon icon={expand ? faTimes : faBars} />
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default index;
