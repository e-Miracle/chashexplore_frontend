import React, { Suspense } from "react";
import { Spinner } from ".";
import { AuthFormLayout } from "../Pages";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { Header } from "./Home";
import {
  faTimesCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderProps } from "./Home";
import useAuthResetPassword from "../hooks/auth/useAuthResetPassword";
import useErrorHandler from "../hooks/useErrorHandler";

const Form = () => {
  const resetPassword = useAuthResetPassword();
  useErrorHandler(resetPassword, "Password Reset Successful", " Error");
  const [visible, setVisibility] = React.useState<Boolean>(false);
  const formSchema = z.object({
    email: z
      .string()
      .email("This is not a valid email.")
      .trim()
      .min(8, { message: "Email length must be at least 8." }),
    token: z
      .string()
      .min(5, { message: "token must have at least five characters " }),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters" })
      .max(50, {
        message: "The password can't accept more than 50 characters",
      })
      .refine(
        (value) =>
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value),
        "All passwords must contain at least 8 characters, including Uppercase and lowercase letters, number and symbol."
      ),
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
    await resetPassword.mutateAsync(data);
  };
  return (
    <Suspense>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-[3rem]">
        <div className="relative">
          <input
            className={
              errors.password && errors.password.message
                ? "w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                : " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
            }
            aria-label="password"
            placeholder="Password"
            type={visible ? "text" : "password"}
            id="password"
            {...register("password", { required: "This is required." })}
            disabled={isSubmitting}
          />
          <button
            onClick={() => setVisibility(!visible)}
            className="text-[#797F8A] absolute right-[1rem] bottom-[2rem]"
            type="button"
          >
            {visible ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </div>
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
              <FontAwesomeIcon icon={faTimesCircle} className="block mr-2" />
              {message}
            </p>
          )}
        />
        <input
          className={
            errors.token && errors.token.message
              ? "w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
              : " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
          }
          aria-label="token"
          placeholder="token"
          type="text"
          id="token"
          {...register("token", { required: "This is required." })}
          disabled={isSubmitting}
        />
        <ErrorMessage
          errors={errors}
          name="token"
          render={({ message }) => (
            <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
              <FontAwesomeIcon icon={faTimesCircle} className="block mr-2" />
              {message}
            </p>
          )}
        />
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
              Send
            </button>
          )}
        </div>
      </form>
    </Suspense>
  );
};

const ResetPassword = () => {
  const headerProps: HeaderProps = {
    title: "Reset Password",
    text: "Please enter your new password.",
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

export default ResetPassword;
