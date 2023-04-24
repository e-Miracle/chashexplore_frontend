import { Suspense } from "react";
import Spinner from "../Spinner";
const Raffles = ({
  item,
  onClick,
}: {
  item: {
    imgSrc: string;
    title: string;
    ticketId: string;
  };
  onClick?: (data: any) => void;
}) => {
  return (
    <Suspense fallback={<Spinner toggle={false} />}>
      <div
        onClick={() => onClick && onClick(item)}
        className="flex items-center bg-white rounded-[10px] mt-[1rem] p-[1rem] font-ubuntu hover:opacity-80 cursor-pointer"
      >
        <div className="w-[32px] h-[32px]">
          <img
            className="w-full h-full object-cover  rounded-full"
            src={item.imgSrc}
            alt={item.imgSrc}
            loading="lazy"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-heading text-sm lg:text-base font-black">
            {item.title}
          </h3>
          <p className="mt-1 text-[#A5A9B0] text-[10px] lg:text-[12px] ">
            {item.ticketId}
          </p>
        </div>
      </div>
    </Suspense>
  );
};

export default Raffles;
