import React, { Suspense, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

type Props = {
  text: string;
};
const CopyText: React.FC<Props> = ({ text }) => {
  const [changeColor, setChangeColor] = useState<boolean>(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setChangeColor(true);
    toast("Copied");
  };
  return (
    <Suspense>
      <div className="flex items-center justify-center w-full">
        <input
          type="text"
          defaultValue={text}
          className=" w-[70%] font-ubuntu p-5 bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-l-[100px] h-[69px] outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3 "
        />
        <button
          onClick={handleCopy}
          className={
            changeColor
              ? "rounded-r-[100px]  h-[69px] text-white bg-primary border border-[#F4F6F8]  text-lg w-[85px]"
              : "rounded-r-[100px]  h-[69px] text-[#797F8A] bg-[#F4F6F8] border border-[#F4F6F8] text-[#1C1B1F] text-lg w-[85px] hover:opacity-80"
          }
        >
          <FontAwesomeIcon icon={faLink} />
        </button>
      </div>
    </Suspense>
  );
};

export default CopyText;
