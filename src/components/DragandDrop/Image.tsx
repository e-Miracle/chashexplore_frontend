import React from "react";
function Image({ image }: { image: any }) {
  return (
    <div>
      <img
        alt={image.src}
        className="  w-full h-[150px]  lg:h-[200px] object-contain mt-1 border border-dashed border-[#F4F6F8] rounded-[10px]"
        src={image.src}
      />
    </div>
  );
}
export default Image;
