import useToastStore from "@/store/toastStore";

export default function useToast() {
  const { setIsToastOpen, setToastColor, setToastTitle } = useToastStore();

  const showToast = (
    msg: string,
    color: "orange" | "red" | "green" = "orange"
  ) => {
    setToastTitle(msg);
    setIsToastOpen(true);
    setToastColor(color);
  };
  return { showToast };
}
