import { HTMLProps } from "react";

// styles
import "./GlowTitle.scss";

type GlowTitleProps = HTMLProps<HTMLHeadingElement>;
export const GlowTitle = (props: GlowTitleProps) => {
  const { children, className = "", ...restOfProps } = props;
  return (
    <h1 className={`text-center glow-title-2mm ${className}`} {...restOfProps}>
      {children}
    </h1>
  );
};
