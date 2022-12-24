import { ReactNode, useEffect } from "react";
import { UseFormSetError } from "react-hook-form";

import { HttpError } from "@/features/types";
import { FormService } from "@/utils/funcs/form-service";

type Props<T> = {
  setError: UseFormSetError<T>;
  errors: T;
  children: ReactNode;
};

export function AppForm<T extends HttpError<T>>({
  setError,
  errors,
  children,
}: Props<T>): JSX.Element {
  useEffect(() => {
    if (errors) {
      FormService.generateErrors({ errors: errors, setError });
      return;
    }
  }, [errors, setError]);
  return <form>{children}</form>;
}
