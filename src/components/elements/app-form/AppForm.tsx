import { ReactNode, useEffect } from "react";
import { UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

import { ErrorResponse } from "@/features/types";
import { FormService } from "@/utils/funcs/form-service";
import { RecordObject } from "@/utils/types";

type Props<
  T extends ErrorResponse<RecordObject, keyof RecordObject>,
  E extends RecordObject
> = {
  setError?: UseFormSetError<E>;
  toastErrorMessage: string;
  errors?: T;
  children: ReactNode;
};

export function AppForm<
  T extends ErrorResponse<RecordObject, keyof RecordObject>,
  E extends RecordObject
>({ setError, errors, children, toastErrorMessage }: Props<T, E>): JSX.Element {
  useEffect(() => {
    if (errors == null) {
      return;
    }
    if (errors.httpError) {
      FormService.generateErrors({ errors: errors.httpError, setError });
      return;
    }
    if (errors.unknownError) {
      toast.error(toastErrorMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, setError]);
  return <form>{children}</form>;
}
