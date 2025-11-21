import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export const LoadingButton = ({
  loading,
  children,
  type = 'submit',
  ...rest
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  loading?: boolean;
}) => {
  return (
    <button
      className="btn btn-sm btn-primary"
      {...rest}
      type={type}
      disabled={loading || rest.disabled}
    >
      {loading ? "Loading" : children}
    </button>
  );
};