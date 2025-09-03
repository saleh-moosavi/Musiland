"use client";

import { useRouter } from "next/navigation";
import PopUpStore from "@/store/popUpStore";
import useToastStore from "@/store/toastStore";

export default function DeleteConfirm() {
  const { id, name, type, isOpen, setIsOpen } = PopUpStore();
  const { setIsToastOpen, setToastTitle, setToastColor } = useToastStore();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${type}s/${id}`, {
        method: "DELETE",
      });
      setIsToastOpen(true);
      setToastTitle(`${name} Deleted Successfully`);
      setToastColor("green");
    } catch (err) {
      alert("Failed to delete.");
      setIsToastOpen(true);
      setToastTitle(String(err));
      setToastColor("red");
    } finally {
      setIsOpen(false);
      router.refresh();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-my-white-low dark:bg-my-black-high dark:text-my-white-low p-6 rounded-xl shadow-lg max-w-sm w-full z-[50]">
            <h3 className="text-lg font-bold mb-4">Delete {type}</h3>
            <p>Are you sure you want to delete "{name}"?</p>
            <div className="flex justify-end gap-4 mt-6 *:px-4 *:py-2 *:rounded-lg *:hover:opacity-80 *:cursor-pointer *:transition-all *:duration-300">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-my-white-high text-my-black-max dark:bg-my-black-med dark:text-my-white-low"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-my-red-med text-my-white-low"
              >
                Delete
              </button>
            </div>
          </div>
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-my-black-max/50 dark:bg-my-white-high/50 z-[10]"
            onClick={() => setIsOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
}
