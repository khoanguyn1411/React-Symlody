/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";

import { RolesID } from "@/features/types";
import { hasElementOfArray } from "@/utils/funcs/has-element-of-array";

import { useAppSelector } from "./../features/hooks";

export const withPermission =
  (alowRoles: RolesID[]) =>
  <T extends (...args: any[]) => any>(
    func: T
  ): ((...funcArgs: Parameters<T>) => ReturnType<T> | void) => {
    const { user } = useAppSelector((state) => state.auth);
    const groupIds = user.groups.map((g) => g.id);
    if (!hasElementOfArray(alowRoles, groupIds)) {
      return () => {
        toast.warning("Bạn không được cấp quyền thực hiện tính năng này", {
          style: { width: 365 },
        });
      };
    }

    // Return a new function that tracks how long the original took
    return (...args: Parameters<T>): ReturnType<T> => {
      return func(...args);
    };
  };
