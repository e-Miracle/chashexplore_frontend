import React, { Suspense, useState } from "react";
import { DashBoardLayout } from "../../";
import Spinner from "../../../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { nFormatter } from "../../../Utils";
import { Raffle } from "../../../assets";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { data } from "../influencer/Profile";
const Modal = React.lazy(() => import("../../../components/Modal/Modal"));

const BackgroundDrop = React.lazy(() =>
  import("../influencer/Profile").then((res) => {
    return {
      default: res.BackgroundDrop,
    };
  })
);
const BackDrop = React.lazy(() =>
  import("../influencer/SingleDraw").then((res) => {
    return {
      default: res.BackDrop,
    };
  })
);

const Header = React.lazy(() =>
  import("../followers/Profile").then((res) => {
    return {
      default: res.Header,
    };
  })
);

const ActiveDraws = React.lazy(() =>
  import("../influencer/Profile").then((res) => {
    return { default: res.ActiveDraws };
  })
);

const InActiveDraws = React.lazy(() =>
  import("../influencer/Profile").then((res) => {
    return { default: res.InActiveDraws };
  })
);

const Body = ({ data, onClick }: { data: any[]; onClick: () => void }) => {
  return (
    <div className=" bg-white mt-[1rem] lg:mt-10   md:h-[calc(100vh-30vh)] font-ubuntu">
      <div className="w-full">
        <ActiveDraws  />
        <InActiveDraws  />
        <div
          className="flex justify-center items-center my-3"
          onClick={onClick}
        >
          <button className=" bg-primary text-[#fff] text-sm lg:text-base outline-none  py-5 px-8 mt-5 rounded-[100px] cursor-pointer hover:opacity-80">
            Suspend Account
          </button>
        </div>
      </div>
    </div>
  );
};

const Form = ({ toggleModal }: { toggleModal: any }) => {
  const formSchema = z.object({
    message: z
      .string()
      .min(3, { message: "name must have at least three characters " })
      .max(20, {
        message: "name must not be greater than 20 characters",
      }),
  });
  type FormSchemaType = z.infer<typeof formSchema>;
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(data);
    toggleModal();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <div className="flex items-center flex-Wrap flex-col lg:flex-row mt-[3rem]">
        <div className="w-full  ">
          <textarea
            className={
              errors.message && errors.message.message
                ? " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                : " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
            }
            aria-label="name"
            // placeholder="Please type your message here"
            {...register("message", { required: "This is required." })}
            disabled={isSubmitting}
          />
          <ErrorMessage
            errors={errors}
            name="message"
            render={({ message }) => (
              <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                <FontAwesomeIcon icon={faTimesCircle} className="block mr-2" />
                {message}
              </p>
            )}
          />
        </div>
      </div>

      <div className=" w-full p-[1rem] lg:p-0 md:flex md:items-end md:justify-end">
        {isSubmitting ? (
          <div>
            <Spinner toggle={false} />
          </div>
        ) : (
          <button
            disabled={isSubmitting}
            type="submit"
            className=" w-full md:w-auto bg-primary text-white text-sm lg:text-base  py-3 px-10 my-5 rounded-[100px] cursor-pointer hover:opacity-80"
          >
            Suspend Account
          </button>
        )}
      </div>
    </form>
  );
};

type ModalContent = {
  onclick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};
const ModalContent: React.FC<ModalContent> = ({ onclick }) => {
  return (
    <BackDrop onclick={onclick}>
      <h3 className="text-primary text-[1.8rem] font-bold lg:text-[2rem] font-ubuntu text-center lg:text-left">
        Account Suspension
      </h3>
      <p className="text-labels text-sm lg:text-base mt-5 text-center lg:text-left">
        Please explain your reason for suspending this account.
      </p>
      <Form toggleModal={onclick} />
    </BackDrop>
  );
};
const Profile = () => {
    const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <Suspense fallback={<Spinner />}>
      <DashBoardLayout type="admin">
        <BackgroundDrop>
          <Header />
          <Body data={data} onClick={() => setIsOpen(true)} />
          <Modal visible={modalIsOpen}>
            <ModalContent onclick={() => setIsOpen(false)} />
          </Modal>
        </BackgroundDrop>
      </DashBoardLayout>
    </Suspense>
  );
};

export default Profile;
