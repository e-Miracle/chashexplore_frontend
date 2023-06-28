import React, { Suspense, SyntheticEvent } from "react";
import { PageLayout, Spinner } from ".";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import validator from "validator";
import { Link } from "react-router-dom";
import { faCheckCircle, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import toast from "react-hot-toast";
import useAuthVerifyAccount from "../hooks/auth/useAuthVerifyAccount";
import useAuthUpdateVerifyAccount from "../hooks/auth/useUpdateVerifyAccountVerfication";
import useCustomInfluencerTypes from "../hooks/utils/useCustomInfluncerTypes";
import useErrorHandler from "../hooks/useErrorHandler";
import {
  getUserData,
  getIdentificationTypes,
  changeContentTypeHeader,
} from "../Utils";
import {
  PAGES,
  USER_TYPES,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  _INFLUENCER_,
} from "../constants";
import { Navigate, useLocation } from "react-router-dom";

interface Types {
  id: number;
  name: string;
  created_at: null;
  updated_at: null;
}

const Form = () => {
  const location = useLocation();
  const useCustomTypes = useCustomInfluencerTypes();
  useErrorHandler(
    useCustomTypes,
    "Influencer Types fetched Successfully",
    "Influencer Types Error"
  );
  React.useEffect(() => {
    const types: Types[] = getIdentificationTypes();
    if (types) setTypes(types);
    else useCustomTypes.mutateAsync();
  }, []);

  const [types, setTypes] = React.useState<Types[]>([]);
  const [currentType, setCurrentType] = React.useState<number>();

  const authVerifyAccount = useAuthVerifyAccount();
  const authUpdateVerifyAccount = useAuthUpdateVerifyAccount(
    currentType as number
  );
  useErrorHandler(
    authVerifyAccount,
    "Influencer Verification Successful",
    "Influencer Verification Error"
  );
  useErrorHandler(
    authUpdateVerifyAccount,
    "Updating Influencer Verification Successful",
    "Updating Influencer Verification Error"
  );
  const [imageUrl, setImageUrl] =
    React.useState<{ image: string; file: File | null }>();

  const formSchema = z.object({
    phone: z.string().refine(validator.isMobilePhone),
    audience_size: z
      .string()
      .refine(
        (value) => /^[1-9][0-9]*$/.test(value),
        "Invalid audience audience_size"
      )
      .refine(
        (value) => Number(value) <= 1000000,
        "Audience audience_size must be less than or equal to 1,000,000"
      ),
    id_type: z
      .string()
      .refine((value) => /^[1-9][0-9]*$/.test(value), "Invalid id type")
      .refine(
        (value) => Number(value) <= 1000000,
        "id_type type must be a number"
      ),
    facebook_url: z
      .string()
      .url()
      .min(3, { message: "facebook_url must have at least three characters " })
      .refine(
        (value) =>
          /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/.test(
            value
          ),
        "Invalid Facebook link"
      ),
    instagram_url: z
      .string()
      .url()
      .min(3, { message: "instagram_url must have at least three characters " })
      .refine(
        (value) =>
          /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/.test(
            value
          ),
        "Invalid Instagram link"
      ),
    twitter_url: z
      .string()
      .url()
      .min(3, { message: "twitter_url must have at least three characters " })
      .refine(
        (value) =>
          /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+$/.test(
            value
          ),
        "Invalid Twitter link"
      ),
    linked_url: z
      .string()
      .url()
      .min(3, { message: "linked_url must have at least three characters " })
      .refine(
        (value) => /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/.test(value),
        "Invalid linked_url link"
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

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleImageChange: changeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl({ image: reader.result as string, file });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormSchmaType> = async (data) => {
    if (!imageUrl?.file) return toast.error("Please add an image");
    if (imageUrl?.file?.size > MAX_FILE_SIZE)
      return toast.error("Max image audience_size is 5MB");
    if (!ACCEPTED_IMAGE_TYPES.includes(imageUrl?.file.type))
      return toast.error(
        "`Only .jpg, .jpeg, and .png  formats are supported.`"
      );

    changeContentTypeHeader(true);
    const formData = new FormData();
    const newdata = {
      ...data,
      id_image: imageUrl?.file,
    };
    console.log(newdata);
    for (const key in newdata) {
      formData.append(key, newdata[key as keyof FormSchmaType]);
    }
    console.log(formData);
    if (location.pathname.includes("update")) {
      setCurrentType(Number(data.id_type));
      await authUpdateVerifyAccount.mutateAsync(formData);
    } else await authVerifyAccount.mutateAsync(formData);
  };

  return (
    <Suspense>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-ubuntu text-primary font-medium text-center lg:text-left text-[2.1rem] lg:text-[2.5rem]">
          Account Verification
          <FontAwesomeIcon className="ml-2" icon={faCheckCircle} />
        </h3>

        <div className="flex items-center flex-Wrap flex-col lg:flex-row mt-[5rem]">
          <label
            htmlFor="phone"
            className="inline-block text-labels font-ubuntu w-full lg:w-1/2 text-[1.2rem] lg:text-[1.5rem]"
          >
            Phone Number
          </label>
          <div className="w-full lg:w-1/2 ">
            <input
              className={
                errors.phone && errors.phone.message
                  ? " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
              aria-label="phone"
              placeholder="Phone Number"
              type="tel"
              id="phone"
              {...register("phone", { required: "This is required." })}
              disabled={isSubmitting}
            />
            <ErrorMessage
              errors={errors}
              name="phone"
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
          </div>
        </div>

        <div className="flex  flex-Wrap flex-col lg:flex-row mt-[1rem]">
          <div className="w-full lg:w-1/2">
            <label
              htmlFor="id_type"
              className="inline-block text-labels font-ubuntu text-[1.2rem] lg:text-[1.5rem]"
            >
              Image
            </label>
            <p className="text-labelLight font-ubuntu lg:text-base text-sm">
              Please select a recent image.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <select
              id="id_type"
              {...register("id_type", {
                required: "This is required.",
                onChange: (e) => {
                  setCurrentType(Number(e.target.value));
                },
              })}
              onClick={() => setTypes(types)}
              className={
                errors.id_type && errors.id_type.message
                  ? "w-full text-lg font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full text-lg font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
            >
              <option value="">Select Valid ID</option>
              {types &&
                types.length > 0 &&
                types.map((type: Types) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
            </select>

            <ErrorMessage
              errors={errors}
              name="id_type"
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

            {imageUrl ? (
              <img
                src={imageUrl?.image}
                className="  w-full h-[150px]  lg:h-[200px] object-contain mt-1 border border-dashed border-[#F4F6F8] rounded-[10px]"
                alt="Image Alt"
              />
            ) : (
              <label
                htmlFor="file"
                className="flex items-center justify-center cursor-pointer text-xl text-labels lg:text-3xl  mt-1 h-[150px]  lg:h-[200px] w-full rounded-[10px] bg-[#8E939D] border border-dashed border-[#F4F6F8]"
              >
                <FontAwesomeIcon className="" icon={faCamera} />
              </label>
            )}

            <input
              type="file"
              accept="photo/*"
              id="file"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex  flex-Wrap flex-col lg:flex-row mt-[1rem]">
          <div className="w-full lg:w-1/2">
            <label className="inline-block text-labels font-ubuntu text-[1.2rem] lg:text-[1.5rem]">
              Social Media Profiles
            </label>
            <p className="text-labelLight font-ubuntu lg:text-base text-sm">
              Please add the links to your social media profiles for review.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <input
              className={
                errors.facebook_url && errors.facebook_url.message
                  ? "w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
              aria-label="facebook_url"
              placeholder="Facebook"
              type="text"
              id="facebook_url"
              {...register("facebook_url", { required: "This is required." })}
              disabled={isSubmitting}
            />

            <ErrorMessage
              errors={errors}
              name="facebook_url"
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

            <input
              className={
                errors.instagram_url && errors.instagram_url.message
                  ? "w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
              aria-label="instagram_url"
              placeholder="Instagram"
              type="text"
              id="instagram_url"
              {...register("instagram_url", { required: "This is required." })}
              disabled={isSubmitting}
            />

            <ErrorMessage
              errors={errors}
              name="instagram_url"
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

            <input
              className={
                errors.twitter_url && errors.twitter_url.message
                  ? "w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
              aria-label="twitter_url"
              placeholder="Twitter"
              type="text"
              id="twitter_url"
              {...register("twitter_url", { required: "This is required." })}
              disabled={isSubmitting}
            />

            <ErrorMessage
              errors={errors}
              name="twitter_url"
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

            <input
              className={
                errors.twitter_url && errors.twitter_url.message
                  ? "w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full  font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
              aria-label="linked_url"
              placeholder="linked_url"
              type="text"
              id="linked_url"
              {...register("linked_url", { required: "This is required." })}
              disabled={isSubmitting}
            />

            <ErrorMessage
              errors={errors}
              name="linked_url"
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
          </div>
        </div>

        <div className="flex  flex-Wrap flex-col lg:flex-row mt-[1rem]">
          <div className="w-full lg:w-1/2">
            <label
              htmlFor="audience_size"
              className="inline-block text-labels font-ubuntu text-[1.2rem] lg:text-[1.5rem]"
            >
              Audience audience_size
            </label>
            <p className="text-labelLight font-ubuntu lg:text-base text-sm">
              What is your audience audience_size?
            </p>
          </div>
          <div className="w-full lg:w-1/2 ">
            <input
              className={
                errors.phone && errors.phone.message
                  ? " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
              aria-label="phone"
              placeholder="Your audience audience_size range"
              type="number"
              id="phone"
              {...register("audience_size", { required: "This is required." })}
              disabled={isSubmitting}
            />
            <ErrorMessage
              errors={errors}
              name="audience_size"
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
          </div>
          {/* <div className="w-full lg:w-1/2">
            <select
              className={
                errors.audience_size && errors.audience_size.message
                  ? "w-full text-lg font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#EA4335] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3"
                  : " w-full text-lg font-ubuntu bg-[#FBFBFD] text-[#797F8A] border border-[#F4F6F8] rounded-[10px] p-5 outline-none placeholder:font-ubuntu placeholder:text-[#797F8A] lg:placeholder:text-[1rem] my-3  "
              }
              id="audience_size"
              {...register("audience_size", { required: "This is required." })}
            >
              <option value="">Select your audience audience_size range</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>

            <ErrorMessage
              errors={errors}
              name="audience_size"
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
          </div> */}
        </div>

        <div className="mt-5 flex flex-col lg:flex-row items-center justify-end">
          <Link
            to={`/my/dashboard/${_INFLUENCER_}`}
            className=" text-center font-ubuntu text-primary text-[1.2rem] lg:text-[1.5rem] hover:opacity-80 p-5 block"
          >
            Skip
          </Link>
          <div className="w-full lg:w-auto ">
            {isSubmitting ? (
              <div>
                <Spinner toggle={false} />
              </div>
            ) : (
              <button
                disabled={isSubmitting}
                type="submit"
                className={
                  "w-full lg:w-auto bg-primary text-[#fff] text-[1rem] lg:text-[1.2rem] font-medium outline-none  py-5 px-[5rem]  rounded-[100px] cursor-pointer hover:opacity-80"
                }
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </Suspense>
  );
};

const AccountVerification = () => {
  if (
    !getUserData()?.token ||
    getUserData()?.role !== USER_TYPES._INFLUENCER_
  ) {
    toast.error(`Unauthorized`, {
      icon: "❌",
    });
    return <Navigate to={PAGES.LOGIN_PAGE} />;
  }

  return (
    <PageLayout>
      <div className="bg-white shadow-normal rounded-[20px] lg:p-10 p-5 ">
        <Form />
      </div>
    </PageLayout>
  );
};

export default AccountVerification;


