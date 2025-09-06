export default function ProfileBtn({
  clickHandler,
  type = "normal",
  children,
}: {
  clickHandler?: () => Promise<void>;
  type?: "normal" | "logout";
  children: string;
}) {
  return (
    <button
      className={`px-4 py-2 min-w-52 rounded-xl shadow-md shadow-my-black-low/50 text-center w-full cursor-pointer ${
        type === "normal"
          ? "bg-my-white-med dark:bg-my-black-med"
          : "bg-my-red-med"
      }`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
