import React, { Suspense } from "react";
import { Spinner } from ".";
import { AuthFormLayout } from "../Pages";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { Header } from "./Home";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderProps } from "./Home";

const Form = () => {
  const formSchema = z.object({
    email: z
      .string()
      .email("This is not a valid email.")
      .trim()
      .min(8, { message: "Email length must be at least 8." }),
  });
  type FormSchmaType = z.infer<typeof formSchema>;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchmaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchmaType> = async (data) => {
    console.log(data);
  };
  return (
    <Suspense>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-[3rem]">
        <div className=" w-full">
          <input
            className={
              errors.email && errors.email.message
                ? "w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                : " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
            }
            aria-label="name"
            placeholder="Email Address"
            type="email"
            id="name"
            {...register("email", { required: "This is required." })}
            disabled={isSubmitting}
          />
          {/* <ErrorMessage errors={errors} name="email" /> */}

          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                <FontAwesomeIcon icon={faTimesCircle} className="block mr-2" />
                {message}
              </p>
            )}
          />
          {isSubmitting ? (
            <div>
              <Spinner toggle={false} />
            </div>
          ) : (
            <button
              disabled={isSubmitting}
              type="submit"
              className={
                "w-full bg-primary text-[#fff] text-sm lg:text-base outline-none  p-5 mt-5 rounded-[100px] cursor-pointer hover:opacity-80"
              }
            >
              Send
            </button>
          )}
        </div>
      </form>
    </Suspense>
  );
};

const ForgotPassword = () => {
  const headerProps: HeaderProps = {
    title: "Forgot Password",
    text: "Please enter your registered email address and we’ll send you a rest password link immediately. ",
  };
  return (
    <Suspense fallback={<Spinner />}>
      <AuthFormLayout>
        <div className=" bg-[#FFFFFF] rounded-[20px] lg:max-w-[800px] max-w-[612px] shadow-normal lg:p-10 p-5">
          <Header {...headerProps} />
          <Form />
        </div>
      </AuthFormLayout>
    </Suspense>
  );
};

export default ForgotPassword;
