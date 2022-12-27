import React from "react";

import { RecordObject } from "../types";
import { delay } from "./delay";
const DEFAULT_DELAY_IMPORT = 1000;

export function lazyImport<I extends RecordObject, K extends keyof I>(
  factory: () => Promise<I>,
  name: K
): I {
  return Object.create({
    [name]: React.lazy(() =>
      delay(DEFAULT_DELAY_IMPORT).then(() =>
        factory().then((module) => ({ default: module[name] }))
      )
    ),
  });
}
