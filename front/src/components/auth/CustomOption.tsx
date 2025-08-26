import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CustomOption({
  title,
  icon,
  register,
  data,
  error,
  multiple = false,
}: any) {
  const [isVisible, setIsVisible] = useState(false);
  const showSubMenu = () => {
    setIsVisible((perv) => !perv);
  };
  return (
    <div className="relative">
      <label
        className="flex items-center justify-between gap-2 bg-white/10 p-2 rounded-full cursor-pointer"
        onClick={showSubMenu}
      >
        <div className="flex items-center gap-3">
          <span className="*:size-5 *:stroke-emerald-500">{icon}</span>
          <p className="text-gray-400">{title}</p>
        </div>
        {isVisible ? (
          <ChevronUp className="text-gray-400" />
        ) : (
          <ChevronDown className="text-gray-400" />
        )}
      </label>
      {isVisible && data && (
        <div className="grid gap-2 p-2 absolute bg-slate-800 w-full rounded-2xl border z-50 overflow-y-scroll max-h-52">
          {data.map((item: any) => (
            <label key={item._id} className="flex items-center gap-2">
              <input
                type={multiple ? "checkbox" : "radio"}
                value={item._id}
                {...register}
                className="h-4 w-4 text-cyan-700 focus:ring-cyan-700"
              />
              <span>{item.name}</span>
            </label>
          ))}
        </div>
      )}
      {error && (
        <p className="text-red-500 text-xs font-semibold mt-2 ml-5">{error}</p>
      )}
    </div>
  );
}
