import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthForms: React.FC<Props> = ({ children }) => {
  return (
    <Suspense>
      <section className=" py-[1rem] lg:py-[2rem] grid place-items-center  h-screen  w-screen custom-bg overflow-auto ">
        {" "}
        <div className="my-container">{children}</div>
      </section>
    </Suspense>
  );
};

export default AuthForms;
