import React, { Suspense } from "react";
import { Spinner } from ".";
import { AuthFormLayout } from "../Pages";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import { Header, SocialComponent } from "./Home";
import {
  faTimesCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderProps } from "./Home";
import useAuthSignUp from "../hooks/auth/useAuthSignUp";
import useErrorHandler from "../hooks/useErrorHandler";

const RegisterForm = () => {
  const authSignup = useAuthSignUp();
  useErrorHandler(authSignup, "Signup Successful", "Signup Error");

  const [visible, setVisibility] = React.useState<Boolean>(false);
  const formSchema = z.object({
    firstname: z
      .string()
      .min(3, { message: "firstname must have at least three characters " })
      .max(20, {
        message: "firstname must not be greater than 20 characters",
      }),
    lastname: z
      .string()
      .min(3, { message: "lastname must have at least three characters " })
      .max(20, {
        message: "lastname must not be greater than 20 characters",
      }),
    email: z
      .string()
      .email("This is not a valid email.")
      .trim()
      .min(8, { message: "Email length must be at least 8." }),
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
    authSignup.mutateAsync({
      first_name: data.firstname,
      last_name: data.lastname,
      email: data.email,
      password: data.password,
    });
  };
  return (
    <Suspense>
      <form onSubmit={handleSubmit(onSubmit)}>
        shhshsh
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <input
            className={
              errors.firstname && errors.firstname.message
                ? "w-full lg:w-[48%] font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                : " w-full lg:w-[48%] font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
            }
            aria-label="firstname"
            placeholder="First Name"
            type="text"
            id="First Name"
            {...register("firstname", { required: "This is required." })}
            disabled={isSubmitting}
          />

          <input
            className={
              errors.lastname && errors.lastname.message
                ? "w-full lg:w-[48%] font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                : " w-full lg:w-[48%] font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
            }
            aria-label="lastname"
            placeholder="Last Name"
            type="text"
            id="Last Name"
            {...register("lastname", { required: "This is required." })}
            disabled={isSubmitting}
          />
        </div>

        <ErrorMessage
          errors={errors}
          name="firstname"
          render={({ message }) => (
            <p className="my-1 text-[#E4033B] text-xs lg:text-sm flex items-center">
              <FontAwesomeIcon icon={faTimesCircle} className="block mr-2" />
              {message}
            </p>
          )}
        />

        <ErrorMessage
          errors={errors}
          name="lastname"
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
          id="email"
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

        {/* <ErrorMessage errors={errors} name="password" /> */}

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
              Sign Up
            </button>
          )}
        </div>
      </form>
    </Suspense>
  );
};

const SignUp = () => {
  const headerProps: HeaderProps = {
    title: "Create an account",
    text: "Do you have an account? ",
    linkName: "Login here",
    route: "/",
  };
  return (
    <Suspense fallback={<Spinner />}>
      <AuthFormLayout>
        <div className=" bg-[#FFFFFF] rounded-[20px] lg:max-w-[800px] max-w-[612px] shadow-normal lg:p-10 p-5">
          <Header {...headerProps} />
          <SocialComponent text="Sign up with:" />
          <RegisterForm />
          <p className="mt-3 font-ubuntu text-[#394355] text-sm lg:text-base text-center lg:text-left">
            By continuing, you agree to CashXplore’s{" "}
            <Link className="text-primary hover:opacity-80" to={"/terms"}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              className="text-primary hover:opacity-80"
              to={"/privacy-policy"}
            >
              Privacy Policy.
            </Link>
          </p>
        </div>
      </AuthFormLayout>
    </Suspense>
  );
};

export default SignUp;
