import {
  PAGE_KEY_MAP_TO_COMPONENT,
  PAGE_KEY_MAP_TO_PATH,
  PAGE_KEY_MAP_TO_TITLE,
} from "./constants";
import { EPageKey, EPagePath, EPageTitle } from "./types";

export function toTitle(pageKey: EPageKey): EPageTitle {
  return PAGE_KEY_MAP_TO_TITLE[pageKey];
}

export function toPath(pageKey: EPageKey): EPagePath {
  return PAGE_KEY_MAP_TO_PATH[pageKey];
}

export function toComponent(pageKey: EPageKey): JSX.Element {
  return PAGE_KEY_MAP_TO_COMPONENT[pageKey];
}
