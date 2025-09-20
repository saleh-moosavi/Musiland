import { ReactNode } from "react";

export default function ProfileBtn({
  title,
  children,
  clickHandler,
  type = "normal",
  isMobile = false,
}: {
  title: string;
  isMobile?: boolean;
  children?: ReactNode;
  type?: "normal" | "logout";
  clickHandler?: () => Promise<void>;
}) {
  if (isMobile) {
    return (
      <button
        className={`p-3 rounded-lg shadow-md shadow-my-black-low/50 text-center cursor-pointer relative group ${
          type === "normal"
            ? "bg-my-white-med dark:bg-my-black-med"
            : "bg-my-red-med"
        }`}
        onClick={clickHandler}
      >
        {children}
        <p className="absolute -bottom-12 right-1/2 translate-x-1/2 text-nowrap text-xs bg-my-black-med p-2 rounded-lg opacity-0 invisible -translate-y-1/2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
          {title}
        </p>
      </button>
    );
  } else {
    return (
      <button
        className={`px-4 py-2 min-w-52 rounded-lg shadow-md shadow-my-black-low/50 text-center w-full cursor-pointer ${
          type === "normal"
            ? "bg-my-white-med dark:bg-my-black-med"
            : "bg-my-red-med"
        }`}
        onClick={clickHandler}
      >
        {title}
      </button>
    );
  }
}
