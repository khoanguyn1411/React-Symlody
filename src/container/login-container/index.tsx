import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FormItem } from "@/components";
import { useAppDispatch } from "@/features";
import { loginAsync } from "@/features/reducers";

import { schema } from "./schema";
import { IFormLoginValue } from "./type";

export const LoginContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    navigate("/");
    toast.success("Đăng nhập thành công");
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="p-4 border shadow-md w-80 rounded-md">
        <form
          className="flex flex-col justify-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormItem label="Email" isRequired error={errors.email?.message}>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input label="Email" value={value} onChange={onChange} />
              )}
            />
          </FormItem>

          <FormItem
            label="Password"
            isRequired
            error={errors.password?.message}
          >
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Password"
                  type="password"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormItem>
          <Button onClick={handleSubmit(onSubmit)}>Login</Button>
        </form>
      </div>
    </div>
  );
};
