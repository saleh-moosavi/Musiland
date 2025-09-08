import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CustomOption({
  title,
  icon,
  register,
  data,
  error,
  multiple = false,
  classes,
}: any) {
  const [isVisible, setIsVisible] = useState(false);
  const showSubMenu = () => {
    setIsVisible((perv) => !perv);
  };
  return (
    <section className="w-full">
      <div
        className={`relative bg-my-white-med h-fit rounded-full ${
          classes && classes
        }`}
      >
        <label
          className="flex items-center justify-between bg-my-white-low/10 p-3 rounded-full cursor-pointer"
          onClick={showSubMenu}
        >
          <div className="flex items-center gap-3">
            <span className="*:size-5 *:stroke-my-green-med">{icon}</span>
            <p className="text-my-black-med">{title}</p>
          </div>
          {isVisible ? (
            <ChevronUp className="text-my-black-low" />
          ) : (
            <ChevronDown className="text-my-black-low" />
          )}
        </label>
        {isVisible && data && (
          <div className="grid gap-2 p-3 mt-3 absolute bg-my-white-med dark:bg-my-black-high w-full rounded-2xl border z-50 overflow-y-scroll max-h-52">
            {data.map((item: any) => (
              <label key={item._id} className="flex items-center gap-2">
                <input
                  type={multiple ? "checkbox" : "radio"}
                  value={item._id}
                  {...register}
                  className="h-4 w-4 text-my-green-med focus:ring-my-green-high"
                />
                <span>{item.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="text-my-red-med text-xs font-semibold mt-2 ml-5">
          {error}
        </p>
      )}
    </section>
  );
}
