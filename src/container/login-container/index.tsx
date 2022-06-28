import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { imgLogin } from "@/assets/images";
import { Button, FormItem, Input } from "@/components";
import { useAppDispatch } from "@/features";
import { loginAsync } from "@/features/reducers";

import { schema } from "./schema";
import { IFormLoginValue } from "./type";

type TStateLocation = {
  path?: string;
};

export const LoginContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const stateLocation: TStateLocation = location?.state;
  const pathLocation = stateLocation?.path;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormLoginValue>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: IFormLoginValue) => {
    const res = await dispatch(
      loginAsync({ email: data.email, password: data.password })
    );
    if (!res.payload) {
      toast.error("Đăng nhập thất bại");
      return;
    }
    navigate(pathLocation || "/");
    toast.success("Đăng nhập thành công");
  };

  return (
    <div className="grid grid-cols-2">
      <div className="flex h-screen col-span-1">
        <div className="flex items-center justify-center w-full bg-primary-50">
          <img
            src={imgLogin.loginBanner}
            alt="Login banner"
            className="w-5/6"
          />
        </div>
      </div>
      <div className="relative flex items-center justify-center col-span-1 min-w-[400px]">
        <img
          src={imgLogin.loginTopRightCorner}
          alt="loginTopRightCorner"
          className="absolute top-0 right-0 w-1/4 -z-10"
        />
        <div className="w-1/2 h-fit ">
          <h1 className="text-3xl font-bold uppercase text-primary-800">
            Đăng nhập
          </h1>
          <form
            className="flex flex-col mt-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormItem label="Email" isRequired error={errors.email?.message}>
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder="Email"
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
            <Button
              className="mt-4 bg-primary-800"
              onClick={handleSubmit(onSubmit)}
            >
              Đăng nhập
            </Button>
            <Link
              className="self-center mt-4 font-medium underline text-primary-800 hover:text-primary-900 transition-all duration-300 w-fit"
              to="#"
            >
              Quên mật khẩu????
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
