import React, { Suspense } from 'react';
import { USER_TYPES } from "../../constants";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const index = () => {
  return (
    <Suspense>
      <div className="md:h-[300px] h-[200px] mt-[1rem]  bg-secondary rounded-[10px] flex flex-col justify-center items-center">
        <p className="font-ubuntu text-base lg:text-lg text-center my-[3rem] text-[#0D1A31]">
          Your Pending campaign has been approved and published.
        </p>
        <Link
          to={`/${USER_TYPES._INFLUENCER_}/my/draws`}
          className=" text-primary  font-ubuntu text-base lg:text-lg text-center"
        >
          {" "}
          View published campaign
          <FontAwesomeIcon className="ml-3" icon={faLongArrowAltRight} />
        </Link>
      </div>
    </Suspense>
  );
}

export default index