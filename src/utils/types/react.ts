import React, { ReactNode } from "react";

/** React common types. */
export namespace AppReact {
  /** Type involves with React.FC */
  export namespace FC {
    /** React props with optional children type. */
    export type PropsWithChildren<T> = React.FC<T & { children?: ReactNode }>;

    /** Required children type. */
    export type Children = React.FC<{ children: ReactNode }>;
  }

  /** Type involves with React.State */
  export namespace State {
    /** React dispatch state action. */
    export type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>;
  }

  /** Type involves with Button. */
  export namespace Button {
    /** Properties of React Button. */
    export type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

    /** Mouse event of React Button (use for event arg). */
    export type MouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

    /** Event handler of React Button (use for onClick action). */
    export type EventHandler = React.MouseEventHandler<HTMLButtonElement>;
  }
}
