import { createMedia } from "@artsy/fresnel";

import { BREAKPOINTS } from "@/constants";

const AppMedia = createMedia({
  breakpoints: BREAKPOINTS,
});

// Make styles for injection into the header of the page
export const mediaStyles = AppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = AppMedia;
