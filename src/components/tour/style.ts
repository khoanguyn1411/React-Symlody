type IStyles = { [key: string]: unknown };

export const tourProviderStyles = {
  popover: (styles: IStyles) => {
    return {
      ...styles,
      top: 8,
      borderRadius: 8,
      // padding: 10,
      padding: 0,
      maxWidth: "100vw",
    };
  },
  badge: (styles: IStyles) => {
    return {
      ...styles,
      background: "#007EA4",
      width: 32,
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      lineHeight: "normal",
      zIndex: 100,
    };
  },
  close: (styles: IStyles) => {
    return {
      ...styles,
      width: 10,
      height: 10,
      outline: "none !important",
      color: "#9ca3af",
      right: 16,
      top: 16,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dot: (styles: any, { current }) => {
    return {
      ...styles,
      outline: "none !important",
      background: current ? "white" : "none",
      display: "none",
    };
  },
  button: (styles: IStyles) => {
    return {
      ...styles,
      outline: "none !important",
    };
  },
  controls: (styles: IStyles) => ({
    ...styles,
    marginTop: 0,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
  }),
};
