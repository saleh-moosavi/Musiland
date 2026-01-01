import { ReactNode } from "react";
import { generalItems } from "./generalItems";

export interface ButtonPropTypes {
  isSubmitting?: boolean;
  text: string;
  mode?: "add" | "edit";
  type: "submit" | "reset" | "button" | undefined;
}

export interface NavListDesktopProps {
  navbarData: generalItems[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  type: "genre" | "playlist";
}

export interface ProfileBtnType {
  title: string;
  isMobile?: boolean;
  children?: ReactNode;
  type?: "normal" | "logout";
  clickHandler?: () => Promise<void>;
}

export interface usicCategoryPropsTypeM {
  params: { music_category: string };
  searchParams: { [key: string]: string | string[] };
}

export type deleteTypes =
  | "song"
  | "genre"
  | "playlist"
  | "user"
  | "album"
  | "singer"
  | null;
