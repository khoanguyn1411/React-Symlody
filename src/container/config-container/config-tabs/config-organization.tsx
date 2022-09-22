import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { images } from "@/assets/images";
import { AvatarUpload, Editor, FormItem, Input } from "@/components";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập thông tin"),
  shortName: yup.string().required("Vui lòng nhập thông tin"),
});

type IFormOrganizationValue = {
  name: string;
  shortName: string;
  description: string;
};

export const TabOrganization: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useForm<IFormOrganizationValue>({ resolver: yupResolver(schema) });

  const [avatar, setAvatar] = useState("");

  const onResponse = (response: string, status: number) => {
    const result = JSON.parse(response);

    if (status === 200) {
      setAvatar(result?.[0].Location);
    }
  };

  return (
    <div>
      <form>
        <FormItem label="Logo tổ chức">
          <AvatarUpload
            char=""
            avatar={avatar || images.Logo}
            onResponse={onResponse}
          />
        </FormItem>
        <div className="grid grid-cols-2 gap-4">
          <FormItem label="Tên tổ chức" isRequired error={errors.name?.message}>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Tên tổ chức"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormItem>

          <FormItem
            label="Tên viết tắt"
            isRequired
            error={errors.shortName?.message}
          >
            <Controller
              control={control}
              name="shortName"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Tên viết tẳt"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormItem>
        </div>

        <FormItem
          label="Giới thiệu tổ chức"
          isRequired
          error={errors.description?.message}
        >
          <Controller
            control={control}
            name="description"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Editor value={value} onChange={onChange} />
            )}
          />
        </FormItem>
      </form>
    </div>
  );
};
