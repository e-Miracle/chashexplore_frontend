import React, { Suspense } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Logo, Background } from "../../assets";
import ProtectedPages from "../../modules/protectedPages";

type Props = {
  children: React.ReactNode;
};
const AuthForms: React.FC<Props> = ({ children }) => {
  return (
    <Suspense>
      {/* <ProtectedPages> */}
        <section className="py-[2rem] grid place-items-center lg:flex lg:justify-center lg:items-center h-screen  w-screen custom-bg overflow-auto ">
          {" "}
          <div className="my-container flex items-center lg:items-start justify-center lg:justify-start flex-col flex-Wrap lg:flex-row object-contain  w-full  ">
            <div className="lg:w-[50%] w-full h-[50px] flex justify-center items-center lg:block ">
              <img
                className="  w-[200px] lg:w-[300px] h-[50px] lg:h-[60px]"
                src={Logo}
                alt="Cashexplore"
              />
            </div>
            <div className=" w-full mt-5 lg:mt-0  flex items-center  justify-center ">
              {children}
            </div>
          </div>
        </section>
      {/* </ProtectedPages> */}
    </Suspense>
  );
};

export default AuthForms;
