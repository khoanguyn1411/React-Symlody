import { ApiResponse } from "apisauce";

import { HttpErrorDto } from "@/features/types";

export type Kind =
  | "ok"
  | "timeout" // Times up.
  | "cannot-connect" // Cannot connect to the server for some reason.
  | "server" // The server experienced a problem. Any 5xx error.
  | "unauthorized" // We're not allowed because we haven't identified ourself. This is 401.
  | "forbidden" // We don't have access to perform that request. This is 403.
  | "not-found" // Unable to find that resource. This is a 404.
  | "conflict" // Conflict
  | "rejected" // All other 4xx series errors.
  | "unknown" // Something truly unexpected happened. Most likely can try again. This is a catch all.
  | "bad-data" // The data we received is not in the expected format.
  | "payment-required";

export type Response<T> = {
  kind: Kind;
  result: T;
  unknownError: unknown;
  httpError: HttpErrorDto;
};

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem<T>(response: ApiResponse<T>): Kind {
  switch (response.problem) {
    case "CONNECTION_ERROR":
      return "cannot-connect";
    case "NETWORK_ERROR":
      return "cannot-connect";
    case "TIMEOUT_ERROR":
      return "timeout";
    case "SERVER_ERROR":
      return "server";
    case "UNKNOWN_ERROR":
      return "unknown";
    case "CLIENT_ERROR":
      switch (response.status) {
        case 401:
          return "unauthorized";
        case 402:
          return "payment-required";
        case 403:
          return "forbidden";
        case 404:
          return "not-found";
        case 409:
          return "conflict";
        case 400:
          return "bad-data";
        default:
          return "rejected";
      }
    default:
      return "unknown";
  }
}
