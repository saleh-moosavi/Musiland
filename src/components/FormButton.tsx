import { ComponentProps, ReactNode } from "react";

interface IProps extends ComponentProps<"button"> {
  children: ReactNode;
  isLoading?: boolean;
}

export default function FormButton({ children, isLoading, ...props }: IProps) {
  return (
    <button
      {...props}
      disabled={isLoading || false}
      className="flex justify-center items-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-my-blue-high to-my-green-med text-my-white-low font-bold rounded-md hover:opacity-80 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all duration-300"
    >
      {children}
      {isLoading && (
        <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
      )}
    </button>
  );
}
