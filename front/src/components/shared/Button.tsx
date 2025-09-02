interface ButtonPropTypes {
  isSubmitting?: boolean;
  text: string;
  mode?: "add" | "edit";
  type: "submit" | "reset" | "button" | undefined;
}
export default function Button({
  isSubmitting,
  text,
  mode,
  type,
}: ButtonPropTypes) {
  return (
    <button
      disabled={isSubmitting || false}
      className="w-full px-4 py-2 bg-gradient-to-r from-cyan-700 to-emerald-400 text-white font-bold rounded-md hover:opacity-80 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all duration-300"
      type={type}
    >
      {mode
        ? isSubmitting
          ? "Saving..."
          : mode === "add"
          ? `Add ${text}`
          : `Update ${text}`
        : `Add ${text}`}
    </button>
  );
}
