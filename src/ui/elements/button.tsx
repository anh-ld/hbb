"use client";

import { cva } from "class-variance-authority";
import type { FC, MouseEvent, ReactNode } from "react";
import { useFormStatus } from "react-dom";

const buttonStyle = cva(["leading-[1.2]", "relative", "overflow-hidden", "z-[1]", "element-button"], {
  variants: {
    color: {
      pink: ["[--angle:#0000]", "[--bg:var(--pink-accent)]", "text-foundation-cream"],
      blue: ["[--angle:#0000]", "[--bg:var(--blue-strong)]", "text-foundation-cream"],
      teal: ["[--angle:#0000]", "[--bg:var(--green-accent)]", "text-foundation-cream"],
      gold: ["[--angle:#0000]", "[--bg:var(--yellow-strong)]", "text-blue-strong"],
      cream: ["[--angle:#0000]", "[--bg:var(--foundation-cream)]", "text-blue-strong"],
    },
    disabled: {
      true: ["pointer-events-none", "opacity-80", "!bg-foundation-grey", "!text-foundation-cream"],
    },
    size: {
      small: ["element-button--small px-4 py-2 text-base"],
      medium: ["element-button--medium px-8 py-4 text-lg"],
      large: [
        "element-button--large px-[20px] py-[15px] font-semibold text-[20px] lg:px-[24px] lg:py-[20px] lg:text-[24px]",
      ],
    },
  },
});

type IButton = {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  color?: "pink" | "blue" | "teal" | "gold" | "cream";
  outline?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  size?: "small" | "large" | "medium";
  value?: string;
};

const Button: FC<IButton> = ({
  children,
  color = "pink",
  className,
  type = "button",
  disabled,
  size = "large",
  onClick,
  value,
}) => {
  const { pending } = useFormStatus();
  const isDisabled = disabled || pending || false;

  const classes = buttonStyle({ color, className, disabled: isDisabled, size });

  return (
    <button type={type} value={value} aria-disabled={pending} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
