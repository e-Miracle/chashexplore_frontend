import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Draws, getUserData, countDown } from "../../Utils";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./DrawsCard";
const Timer = React.lazy(() => import("../Timer/Timer"));
type Props = {
  item: Draws;
  noref: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};
const DrawsCard: React.FC<Props> = (props) => {
  return (
    <div
      ref={props.noref}
      className=" w-full  relative bg-white rounded-[10px] font-ubuntu mt-5 p-[1rem] shadow-drawCard"
    >
      <span className="absolute  font-black top-0 right-0 text-heading text-sm lg:text-base bg-white p-1 rounded-tr-[10px]">
        {props.item.ticket?.id}
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

      <h3 className="text-heading my-3 text-sm lg:text-base font-black">
        {props.item.title}
      </h3>
      <h2 className="text-primary my-3 font-black">
        Status: {props.item.status}
      </h2>
      <div className="flex items-center ">
        <h4 className="text-[#646C79] text-[10px] lg:text-[12px]">Ends in:</h4>
        <h2 className="text-[#0D1A31] text-sm lg:text-base ml-2 font-semibold">
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
      <div className="my-[1rem] flex justify-center items-center">
        <button
          onClick={props.onClick}
          className=" w-full md:w-auto bg-[#BDC7DA] text-white text-sm lg:text-base  py-3 px-10 my-5 rounded-[100px] cursor-pointer hover:bg-primary"
        >
          Redeem Prize
        </button>
      </div>
    </div>
  );
};

export default DrawsCard;
