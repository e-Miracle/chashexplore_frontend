import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { USER_TYPES, _INFLUENCER_ } from "../../constants";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Draw } from "../../assets";

const CreateNewDraw = () => {
  return (
    <Suspense>
      <div className="md:h-[calc(100%-51.5%)] h-[200px] bg-secondary rounded-[10px] flex flex-col justify-center items-center">
        <LazyLoadImage
          className="  w-[100px] h-[100px] lg:w-[200px] lg:h-[200px]  my-[1rem]  object-contain"
          src={Draw}
          placeholderSrc={"https://via.placeholder.com/100x100"}
          alt={Draw}
        />
        <Link
          to={`/my/dashboard/${_INFLUENCER_}/draws`}
          className=" text-primary  font-ubuntu text-base lg:text-lg text-center"
        >
          {" "}
          Create New Draw <FontAwesomeIcon className="ml-3" icon={faLongArrowAltRight} />
        </Link>
      </div>
    </Suspense>
  );
};
 
export default CreateNewDraw;
