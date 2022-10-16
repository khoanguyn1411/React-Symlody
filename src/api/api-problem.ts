import { ApiResponse } from "apisauce";

export type GeneralApiProblem<T> = {
  kind:
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
    | "payment-required"; // Payment required first.
  temporary?: boolean;
  result: ApiResponse<any>;
};

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem<T>(
  response: ApiResponse<T>
): GeneralApiProblem<T> {
  switch (response.problem) {
    case "CONNECTION_ERROR":
      return { kind: "cannot-connect", temporary: true, result: response };
    case "NETWORK_ERROR":
      return { kind: "cannot-connect", temporary: true, result: response };
    case "TIMEOUT_ERROR":
      return { kind: "timeout", temporary: true, result: response };
    case "SERVER_ERROR":
      return { kind: "server", result: response };
    case "UNKNOWN_ERROR":
      return { kind: "unknown", temporary: true, result: response };
    case "CLIENT_ERROR":
      switch (response.status) {
        case 401:
          return { kind: "unauthorized", result: response };
        case 402:
          return { kind: "payment-required", result: response };
        case 403:
          return { kind: "forbidden", result: response };
        case 404:
          return { kind: "not-found", result: response };
        case 409:
          return { kind: "conflict", result: response };
        case 400:
          return { kind: "bad-data", result: response };
        default:
          return { kind: "rejected", result: response };
      }
    default:
      return { kind: "unknown", temporary: true, result: response };
  }
}
