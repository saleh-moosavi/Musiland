"use client";

import { useRouter } from "next/navigation";
import PopUpStore from "@/store/popUpStore";

export default function DeleteConfirm() {
  const { id, name, type, isOpen, setIsOpen } = PopUpStore();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${type}s/delete/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      alert("Failed to delete.");
    } finally {
      setIsOpen(false);
      router.refresh();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-[10]"
          onClick={() => setIsOpen(false)}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full z-[50]">
            <h3 className="text-lg font-bold mb-4">Delete {type}?</h3>
            <p>Are you sure you want to delete "{name}"?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:opacity-80"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:opacity-80"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
