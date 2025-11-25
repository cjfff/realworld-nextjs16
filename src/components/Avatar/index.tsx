import { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import { defaultAvatarUrl } from "../NavComponent/const";

export const Avatar = ({
  src,
  ...args
}:DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  return <img src={src || defaultAvatarUrl} {...args} />;
};
