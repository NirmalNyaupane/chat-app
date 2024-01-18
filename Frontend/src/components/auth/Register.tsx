import { EmailVerificationEnum, UserRoleEnum } from "@/constants/enum";
import { registerValidation } from "@/lib/formvalidation/authvalidation";
import { cn } from "@/lib/utils";
import { userRegisterApi } from "@/service/auth/auth.service";
import { RegisterUserType } from "@/types/auth/AuthType";
import { ApiFailureError } from "@/types/generics/ApiGenericsType";
import { showError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import {
  InputField,
  InputFieldWithRightIcon
} from "../common/InputField";
import LoadingButton from "../common/LoadingButton";
import { Button } from "../ui/button";
import { FormField } from "../ui/form";
import { useToast } from "../ui/use-toast";
interface props {
  role: UserRoleEnum;
  className?: string;
}

const Register: FC<props> = ({ role, className }: props) => {
  /********************** state *********************************/
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setConfirmPasswordShow] = useState(false);

  /******************* Hooks *******************/
  const { toast } = useToast();
  const router = useRouter();
  /*************** Methods ***************************/

  /** Form handling using react-hook-form ****************/
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    reset,
  } = useForm<RegisterUserType>({
    resolver: zodResolver(registerValidation),
  });

  /**************** Mutation query using react-query ******************/
  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterUserType) => {
      return userRegisterApi(data);
    },
    onSuccess: (data) => {
      if (data.status === 200 || data.status === 201) {
        toast({
          variant: "default",
          className: "bg-green-600 text-white font-bold",
          description: "User registered sucessfully",
          duration: 1000,
        });
        router.push(
          `/email-verify?email=${getValues("email")}&action=${EmailVerificationEnum.NewRegister
          }`
        );
        reset();
      }
    },
    onError: (error: AxiosError<ApiFailureError<any>>) => {
      toast({
        variant: "destructive",
        description: showError(error),
        className: "font-bold",
        duration: 1000,
      });
    },
  });

  const formSubmit: SubmitHandler<RegisterUserType> = async (data) => {
    mutate(data);
  };

  return (
    <>
      <form
        className={cn(`flex flex-col gap-2 ${className}`)}
        onSubmit={handleSubmit(formSubmit)}
      >
        <FormField
          name="name"
          control={control}
          render={({ field }) => {
            return (
              <InputField
                type="text"
                placeholder="Full Name"
                formReturn={register("name")}
                className="bg-transparent"
                {...field}
                errorMessage={errors.name?.message}
              />
            );
          }}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => {
            return (
              <InputField
                type="email"
                placeholder="Email"
                errorMessage={errors.email?.message}
                className="bg-transparent"
                {...field}
              />
            );
          }}
        />

        <InputFieldWithRightIcon
          placeholder="Password"
          type={!isPasswordShow ? "password" : "text"}
          rightIcon={
            !isPasswordShow ? (
              <Eye className="cursor-pointer" />
            ) : (
              <EyeOff className=" cursor-pointer" />
            )
          }
          className="bg-transparent"
          {...register("password")}
          errorMessage={errors.password?.message}
          onRightIconClicked={() => {
            setPasswordShow(!isPasswordShow);
          }}
        />
        <InputFieldWithRightIcon
          placeholder="Confirm Password"
          type={!isConfirmPasswordShow ? "password" : "text"}
          rightIcon={
            !isConfirmPasswordShow ? (
              <Eye className="cursor-pointer" />
            ) : (
              <EyeOff className=" cursor-pointer" />
            )
          }
          className="bg-transparent"
          {...register("confirmPassword")}
          errorMessage={errors.confirmPassword?.message}
          onRightIconClicked={() => {
            setConfirmPasswordShow(!isConfirmPasswordShow);
          }}
        />


        <LoadingButton type="submit" isLoading={isPending} clasName="bg-green-500 hover:bg-green-400">
          Login
        </LoadingButton>

        {role === UserRoleEnum.USER && (
          <>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
              OR SIGN UP USING
            </p>
            <div className="text-center my-3">
              <Button className="bg-white text-black border-black border-2 hover:text-white">
                <FaGoogle />
              </Button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default memo(Register);
