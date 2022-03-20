import { styled, CSS } from "@nextui-org/react";

export interface IconProps {
  fill?: string;
  filled?: boolean;
  size?: string | number;
  height?: string | number;
  width?: string | number;
  label?: string;
  onClick?: () => void;
  className?: string;
  css?: CSS;
}

export { default as MoonIcon } from "./MoonIcon";
export { default as SunIcon } from "./SunIcon";
