import React, { Suspense } from "react";
import Lottie from "lottie-react";
import { Connection } from "../../assets";

type Props = {
  err: string;
  small?: boolean;
};

const Error: React.FC<Props> = ({ err, small = false }) => {
  return (
    <Suspense>
      <div
        className={` flex justify-center items-center flex-col w-full ${
          small ? " h-full" : " h-screen"
        }`}
      >
        <div className="mt-10 ">
          <Lottie
            animationData={Connection}
            loop={true}
            className={small ? "w-[50%] h-[50%]" : "w-[300px] h-[300px]"}
          />
        </div>

        <h1 className="text-lg font-ubuntu text-primary my-5 lg:text-xl text-center ">
          Sorry, check your internet settings and retry again.
        </h1>

        <p className="text-lg mt-5 font-nunito w-full lg:text-base text-center text-[#213F7D]">
          {err}
        </p>
      </div>
    </Suspense>
  );
};

export default Error;
