import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
type Props = {
  imgSrc: string;
  status: string;
  title: string;
  endIn: string;
  id: string;
  ticketId: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};
const DrawsCard: React.FC<Props> = (props) => {
  return (
    <div className=" w-full  relative bg-white rounded-[10px] font-ubuntu mt-5 p-[1rem] shadow-drawCard">
      <span className="absolute  font-black top-0 right-0 text-heading text-sm lg:text-base bg-white p-1 rounded-tr-[10px]">
        {props.ticketId}
      </span>
      <div className=" w-full h-[120px] md:h-[155px]">
        <img
          src={props.imgSrc}
          alt={props.imgSrc}
          className=" w-full h-full  object-cover rounded-t-[10px]"
          loading="lazy"
        />
      </div>

      <h3 className="text-heading my-3 text-sm lg:text-base font-black">
        {props.title}
      </h3>
      <h2 className="text-primary my-3 font-black">Status: {props.status}</h2>
      <div className="flex items-center ">
        <h4 className="text-[#646C79] text-[10px] lg:text-[12px]">Ends in:</h4>
        <h2 className="text-[#0D1A31] text-sm lg:text-base ml-2 font-semibold">
          {props.endIn}
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
