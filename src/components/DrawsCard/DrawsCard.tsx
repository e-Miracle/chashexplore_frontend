import React, { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Draws, getUserData, countDown } from "../../Utils";
import { _INFLUENCER_ } from "../../constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Timer = React.lazy(() => import("../Timer/Timer"));
type Props = {
  item: Draws;
  noref: any;
};
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const DrawsCard: React.FC<Props> = (props) => {
  return (
    <Suspense>
      <div
        ref={props.noref}
        className="flex-shrink-0 w-full md:w-[300px] relative bg-white rounded-[10px] font-ubuntu mt-5  shadow-drawCard"
      >
        <span className="absolute top-0 right-0 z-[999] text-[#45AD20] text-sm lg:text-base bg-white p-1 rounded-tr-[10px]">
          ₦{Number(props.item.ticket?.ticket_prize).toLocaleString()}
        </span>
        <div className=" w-full ">
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {props.item.media.map((item, i: number) => (
              <img
                key={i}
                src={item.original_url}
                alt={item.file_name}
                className="w-full h-[120px] md:h-[155px]  object-cover rounded-t-[10px]"
                loading="lazy"
              />
            ))}
          </Carousel>
        </div>

        <div className="p-[1rem]">
          <h3 className="text-heading my-3 text-sm lg:text-base font-bold capitalize">
            {props.item.title}
          </h3>
          <h2 className="text-heading my-3 capitalize">
            {getUserData()?.first_name} {getUserData()?.last_name}{" "}
            {getUserData()?.account_verfied != "0" && (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="ml-2 text-primary"
              />
            )}
          </h2>
          <div className="flex items-end justify-between">
            <div>
              <h4 className="text-[#646C79] text-[10px] lg:text-[12px]">
                Ends in:
              </h4>
              <h2 className="text-[#0D1A31] text-sm lg:text-base mt-1">
                <Timer
                  countDownDate={
                    new Date(
                      countDown(props.item.end_date).year,
                      countDown(props.item.end_date).month,
                      countDown(props.item.end_date).day
                    )
                  }
                  small={true}
                />
              </h2>
            </div>
            <Link
              to={`/my/dashboard/${_INFLUENCER_}/draws/singledraw/${props.item.id}`}
              className="text-primary text-sm lg:text-base hover:opacity-80"
            >
              View Raffle Here{" "}
              <FontAwesomeIcon
                className="ml-2 text-primary"
                icon={faLongArrowAltRight}
              />
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default DrawsCard;
