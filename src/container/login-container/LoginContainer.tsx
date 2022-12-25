import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { images } from "@/assets/images";
import { Button, FormItem, Input } from "@/components";
import { useAppDispatch } from "@/features";
import { loginAsync, setIsAuth } from "@/features/reducers";
import { Login } from "@/features/types";
import { FormService } from "@/utils/funcs/form-service";
import { TokenService } from "@/utils/funcs/token-service";

import { schema } from "./schema";

export const LoginContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<Login>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: Login) => {
    const response = await dispatch(
      loginAsync({ email: data.email, password: data.password })
    );

    FormService.validateResponse({
      asyncThunk: loginAsync,
      response,
      errorMessage: "Đăng nhập thất bại",
      successMessage: "Đăng nhập thành công",
      setError,
      onSuccess: (token) => {
        TokenService.setToken(token);
        dispatch(setIsAuth(true));
      },
    });
  };

  return (
    <div className="grid grid-cols-2">
      <div className="flex h-screen col-span-1">
        <div className="flex flex-col items-center justify-center w-full bg-primary-50">
          <img src={images.loginBanner} alt="Login banner" className="w-5/6" />
          <span className="text-sm italic">Phát triển bởi: Symlody Team</span>
          <span className="text-sm italic font-medium">Version: 1.0</span>
        </div>
      </div>
      <div className="relative flex items-center justify-center col-span-1 min-w-[400px]">
        <img
          src={images.loginTopRightCorner}
          alt="loginTopRightCorner"
          className="absolute top-0 right-0 w-1/4 -z-10"
        />
        <div className="w-1/2 h-fit ">
          <h1 className="text-3xl font-bold text-center uppercase text-primary-800">
            Đăng nhập
          </h1>
          <form
            className="flex flex-col mt-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormItem label="Username" isRequired error={errors.email?.message}>
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder="Username"
                  />
                )}
              />
            </FormItem>

            <FormItem
              label="Mật khẩu"
              isRequired
              error={errors.password?.message}
            >
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange } }) => (
                  <Input
                    type="password"
                    value={value}
                    onChange={onChange}
                    placeholder="Mật khẩu"
                  />
                )}
              />
            </FormItem>

            <Button type="submit" className="mt-4" isShowLoading={isSubmitting}>
              Đăng nhập
            </Button>
            <Link
              className="self-center mt-4 font-medium underline text-primary-800 hover:text-primary-900 transition-all duration-300 w-fit"
              to="#"
            >
              Quên mật khẩu?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
