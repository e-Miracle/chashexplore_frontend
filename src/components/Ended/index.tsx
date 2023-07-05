import  { Suspense } from "react";
import { PrizeDraw } from "../../assets";

const index = () => {
  return (
    <Suspense>
      <div className="flex flex-col justify-center items-center h-full">
        <img
          className="  w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]  my-[1rem]  object-contain"
          src={PrizeDraw}
          alt={PrizeDraw}
        />

        <p className="font-ubuntu text-base lg:text-lg text-center my-[3rem] text-[#0D1A31] mt-5">
         This draw has  ended.
        </p>
      </div>
    </Suspense>
  );
};

export default index;
