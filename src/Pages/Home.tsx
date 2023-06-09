import React, { Suspense } from "react";
import { Spinner } from ".";
import { AuthFormLayout } from "../Pages";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import { Google, Twitter, Facebook, LinkedIn, Instagram } from "../assets";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  faTimesCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthLogin from "../hooks/auth/useAuthLogin";
import useErrorHandler from "../hooks/useErrorHandler";
export type HeaderProps = {
  title: string;
  text: string;
  linkName?: string;
  route?: string;
};

type socialCta = { imgUrl: string; cta: string; color?: string };

export const Header: React.FC<HeaderProps> = ({
  title,
  text,
  linkName,
  route,
}) => {
  return (
    <div>
      <h1 className="font-ubuntu text-primary text-[2rem] lg:text-[2.5rem] text-center lg:text-left">
        {title}
      </h1>
      <p className="mt-3 font-ubuntu text-[#394355] text-[1.2rem] lg:text-[1.5rem] text-center lg:text-left">
        {text}{" "}
        <Link className="text-primary hover:opacity-80" to={route ? route : ""}>
          {linkName}
        </Link>
      </p>
    </div>
  );
};

export const SocialComponent = ({
  text,
  option = true,
}: {
  text?: string;
  option?: boolean;
}) => {
  const socailCta: socialCta[] = [
    { imgUrl: Google, cta: "" },
    { imgUrl: Twitter, cta: "", color: "#1D9BF0" },
    { imgUrl: Facebook, cta: "", color: "#1877F2" },
    { imgUrl: LinkedIn, cta: "" },
    { imgUrl: Instagram, cta: "" },
  ];
  return (
    <div className="my-[1.5rem]">
      {text && (
        <h4 className="text-[#797F8A] font-ubuntu text-[1.2rem] lg:text-[1.5rem] my-3 text-center lg:text-left">
          {text}
        </h4>
      )}
      <div className="flex flex-wrap justify-between items-center">
        {socailCta.map((item: socialCta, i: number) => (
          <button
            className="hover:opacity-80 rounded-[4px] shadow-primary p-2 flex justify-center items-center mr-2"
            key={i}
            style={{ background: item?.color }}
          >
            <LazyLoadImage
              className="w-[30px] lg:w-[40px] h-[30px] lg:h-[40px] object-contain"
              src={item.imgUrl}
              placeholderSrc={"https://via.placeholder.com/72x72"}
              alt={item.imgUrl}
            />
          </button>
        ))}
      </div>

      {option && (
        <div className="text-[#BABCC1] my-5 flex items-center justify-between font-ubuntu text-[1.2rem] lg:text-[1.5rem]">
          {" "}
          <hr className="border-[1px] w-[40%]" />
          <span>0R</span>
          <hr className="border-[1px] w-[40%]" />
        </div>
      )}
    </div>
  );
};

const LoginForm = () => {
  const authLogin = useAuthLogin();
  useErrorHandler(authLogin, "Login Successful", "Login Error");
  const [visible, setVisibility] = React.useState<Boolean>(false);
  const formSchema = z.object({
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
      // .refine(
      //   (value) =>
      //     /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value),
      //   "All passwords must contain at least 8 characters, including Uppercase and lowercase letters, number and symbol."
      // ),
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
    authLogin.mutateAsync(data);
  };

  return (
    <Suspense>
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
              Login
            </button>
          )}
        </div>
      </form>
    </Suspense>
  );
};

const Login = () => {
  const headerProps: HeaderProps = {
    title: "Login",
    text: "Don’t have an account? ",
    linkName: "Sign up here",
    route: "",
  };
  return (
    <Suspense fallback={<Spinner />}>
      <AuthFormLayout>
        <div className=" bg-[#FFFFFF] rounded-[20px] lg:max-w-[800px] max-w-[612px] shadow-normal lg:p-10 p-5">
          <Header {...headerProps} />
          <SocialComponent text="Login with:" />
          <LoginForm />
          <Link
            className=" block  text-right mt-5 text-primary hover:opacity-80 text-sm lg:text-base"
            to={"/terms"}
          >
            Forgot Password?
          </Link>
        </div>
      </AuthFormLayout>
    </Suspense>
  );
};

export default Login;
