"use client";
import { AUTH_COOKIE_NAME } from "@/constants/config";
import { EmailVerificationEnum } from "@/constants/enum";
import { loginFormValidation } from "@/lib/formvalidation/authvalidation";
import { loginUserApi } from "@/service/auth/auth.service";
import { LoginUserType } from "@/types/auth/AuthType";
import { setCookie } from "@/utils/cookie";
import { showError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField, InputFieldWithRightIcon } from "../common/InputField";
import LoadingButton from "../common/LoadingButton";
import { Checkbox } from "../ui/checkbox";
import useCustomToast from "@/hooks/useToast";
const Login = () => {
  /******************* state **************************/
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState<boolean>(false);


  /********************** Hooks  *******************************/
  const router = useRouter();
  const toast = useCustomToast()

  /******* React hook form for form handling *****************/
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset
  } = useForm<LoginUserType>({
    resolver: zodResolver(loginFormValidation), //zod validaton
  });

  /******************** React query mutation  ****************/
  const loginMutation = useMutation({
    mutationFn: (data: LoginUserType) => {
      return loginUserApi(data);
    },
    onSuccess: (data) => {
      if (data.status === 200 || data.status === 201) {
        const jwt = data.data.accessToken;
        if (!jwt) {
          toast.error("Something went wrong")
          return null;
        }
        reset();
        setCookie({
          cookieName: AUTH_COOKIE_NAME ?? "",
          cookieValue: jwt,
          path: '/',
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
        router.push('/chat');
      }
    },
    onError: (error: AxiosError<any, any>) => {
      toast.error(showError(error))
      if (error.response?.data?.is_verified === false) {
        router.push(
          `/email-verify?email=${getValues("email")}&action=${EmailVerificationEnum.NewRegister
          }`
        );
      }
    },
  });

  /*** Handle the form after submission ***/
  const handleFormSubmit = handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
      <InputField
        type="email"
        placeholder="Email"
        className="bg-transparent"
        {...register("email")}
        errorMessage={errors.email?.message}
      />

      <InputFieldWithRightIcon
        placeholder="Password"
        type={!isPasswordShow ? "password" : "text"}
        className="bg-transparent"
        rightIcon={
          !isPasswordShow ? (
            <Eye className="cursor-pointer" />
          ) : (
            <EyeOff className=" cursor-pointer" />
          )
        }
        onRightIconClicked={() => {
          setPasswordShow(!isPasswordShow);
        }}
        errorMessage={errors.password?.message}
        {...register("password")}
      />

      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            className="border-gray-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
            checked={keepMeLoggedIn}
            onCheckedChange={() => setKeepMeLoggedIn(!keepMeLoggedIn)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
             peer-disabled:opacity-70"
          >
            Keep me logged in
          </label>
        </div>
        <div className="ml-auto font-medium text-green-500">Forget Password?</div>
      </div>

      <LoadingButton type="submit" isLoading={loginMutation.isPending} clasName="bg-green-500 hover:bg-green-400">
        Login
      </LoadingButton>
    </form>
  );
};

export default Login;
