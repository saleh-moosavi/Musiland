"use client";

import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import PopUpStore from "@/store/popUpStore";

export default function DeleteConfirm() {
  const { id, name, type, isOpen, setIsOpen, popUpFn } = PopUpStore();
  const { showToast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const data = await popUpFn?.(id);
      if (data && data.success) {
        showToast(`${name} Deleted Successfully`, "red");
      }
    } catch (err) {
      showToast(
        err instanceof Error ? String(err.message) : "Failed To Delete",
        "green"
      );
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
            <p>Are you sure you want to delete *{name}*?</p>
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
