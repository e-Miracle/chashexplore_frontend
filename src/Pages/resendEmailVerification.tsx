import React, { Suspense } from "react";
import { AuthFormLayout } from "../Pages";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { Header, HeaderProps } from "./Home";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from ".";
import useAuthVerifyEmail from "../hooks/auth/useAuthRsendVerifyEmail";
import useErrorHandler from "../hooks/useErrorHandler";
type Props = {};

const VerifyEmail = (props: Props): JSX.Element => {
  const authVerifyEmail = useAuthVerifyEmail();
  useErrorHandler(
    authVerifyEmail,
    "Token sent",
    "Server Error"
  );
  const headerProps: HeaderProps = {
    title: "Resend Email",
    text: "Don't have an account?",
    linkName: "SignUp here",
    route: "/register",
  };
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
   await authVerifyEmail.mutateAsync(data);
  };
  return (
    <Suspense>
      {" "}
      <AuthFormLayout>
        <div className=" bg-[#FFFFFF] rounded-[20px] lg:max-w-[800px] max-w-[612px] shadow-normal lg:p-10 p-5">
          <Header {...headerProps} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className={
                errors.email && errors.email.message
                  ? "w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
              aria-label="name"
              placeholder="Email Address"
              type="email"
              id="email"
              {...register("email", { required: "This is required." })}
              disabled={isSubmitting}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="block mr-2"
                  />
                  {message}
                </p>
              )}
            />
            <div className=" w-full">
              {isSubmitting ? (
                <div>
                  <Spinner toggle={false} />
                </div>
              ) : (
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className={
                    "w-full bg-[#819BC9] text-[#fff] text-sm lg:text-base outline-none  p-5 mt-5 rounded-[100px] cursor-pointer hover:opacity-80"
                  }
                >
                  Resend
                </button>
              )}
            </div>
          </form>
        </div>
      </AuthFormLayout>{" "}
    </Suspense>
  );
};

export default VerifyEmail;
