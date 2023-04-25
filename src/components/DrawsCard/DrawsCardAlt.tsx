import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
type Props = {
  imgSrc: string;
  name: string;
  title: string;
  endIn: string;
  id: string;
  price: number;
};
const DrawsCard: React.FC<Props> = (props) => {
  return (
    <div className=" w-full  relative bg-white rounded-[10px] font-ubuntu mt-5 p-[1rem] shadow-drawCard">
      <span className="absolute top-0 right-0 text-[#45AD20] text-sm lg:text-base bg-white p-1 rounded-tr-[10px]">
        ₦{props.price}
      </span>
      <div className=" w-full h-[120px] md:h-[155px]">
        <img
          src={props.imgSrc}
          alt={props.imgSrc}
          className=" w-full h-full  object-cover rounded-t-[10px]"
          loading="lazy"
        />
      </div>

      <h3 className="text-heading my-3 text-sm lg:text-base font-bold">
        {props.title}
      </h3>
      <h2 className="text-heading my-3">
        {props.name}{" "}
        <FontAwesomeIcon className="ml-2 text-primary" icon={faCheckCircle} />
      </h2>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-[#646C79] text-[10px] lg:text-[12px]">
            Ends in:
          </h4>
          <h2 className="text-[#0D1A31] text-sm lg:text-base mt-1">
            {props.endIn}
          </h2>
        </div>
        <Link
          to={`/${props.id}`}
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
  );
};

export default DrawsCard;
