import { lazyImport } from "@/utils/funcs/lazy-import";

const { MemberContainer } = lazyImport(
  () => import("../container/member-container/MemberContainer"),
  "MemberContainer"
);

const { PropertyContainer } = lazyImport(
  () => import("../container/property-container/PropertyContainer"),
  "PropertyContainer"
);

const { TodoContainer } = lazyImport(
  () => import("../container/todo-container/TodoContainer"),
  "TodoContainer"
);

const { ConfigContainer } = lazyImport(
  () => import("../container/config-container/ConfigContainer"),
  "ConfigContainer"
);

const { LoginContainer } = lazyImport(
  () => import("../container/login-container/LoginContainer"),
  "LoginContainer"
);

const { NoDataContainer } = lazyImport(
  () => import("../container/no-data-container/NoDataContainer"),
  "NoDataContainer"
);

export const LazyContainer = {
  MemberContainer,
  PropertyContainer,
  TodoContainer,
  ConfigContainer,
  LoginContainer,
  NoDataContainer,
};
