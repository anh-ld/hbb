import cn from "classnames";
import { type InputHTMLAttributes, type ReactNode, TextareaHTMLAttributes, forwardRef } from "react";

type IInput = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  line?: string;
};

const Input = forwardRef<HTMLInputElement, IInput>((props, ref) => {
  const { label, id, className, startIcon, endIcon, disabled, ...rest } = props;

  return (
    <div
      className={cn(
        "element-input",
        { "element-input--icon-left": Boolean(startIcon) },
        { "element-input--icon-right": Boolean(endIcon) },
        className,
      )}
      data-id={id}
    >
      {label && <label htmlFor={id}>{label}</label>}
      {startIcon && <span className="input-icon input-icon--left">{startIcon}</span>}
      <input id={id} ref={ref} disabled={disabled} {...rest} />
      {endIcon && <span className="input-icon input-icon--right">{endIcon}</span>}
    </div>
  );
});

export default Input;
