import { useRef, useState } from "react";
import { ChevronUp } from "lucide-react";
import { FieldPath, FieldValues, UseFormRegisterReturn } from "react-hook-form";

interface CustomOptionProps {
  title: string;
  multiple?: boolean;
  icon?: React.ReactNode;
  data: { id: string; name: string }[];
  error?: React.ReactNode | string;
  register: UseFormRegisterReturn<FieldPath<FieldValues>>;
}

export default function CustomOption({
  title,
  icon,
  register,
  data,
  error,
  multiple = false,
}: CustomOptionProps) {
  const selected = useRef<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // TimeOut To Invisible The Sub Menu
  let timeOutRef: NodeJS.Timeout;
  const toggleSubMenuVisibility = (status?: boolean) => {
    if (timeOutRef) {
      clearTimeout(timeOutRef);
    }
    if (status && status == isVisible) return;
    timeOutRef = setTimeout(() => {
      setIsVisible((perv) => status ?? !perv);
    }, 200);
  };

  // Change Value Of Title
  const handleInputTitle = (name?: string) => {
    if (name && multiple) {
      selected.current = selected.current.includes(name)
        ? selected.current?.filter((item) => item !== name)
        : [...selected.current, name];
      return;
    } else if (name && !multiple) {
      selected.current = [name];
    }
    toggleSubMenuVisibility();
  };

  return (
    <section
      className="w-full"
      onMouseEnter={() => toggleSubMenuVisibility(true)}
      onMouseLeave={() => toggleSubMenuVisibility(false)}
    >
      <div className={`relative bg-my-white-med h-fit rounded-lg`}>
        <label
          className="flex items-center justify-between bg-my-white-low/10 p-3 rounded-full cursor-pointer"
          onClick={() => toggleSubMenuVisibility()}
        >
          <div className="flex items-center gap-3">
            <span className="*:size-5 *:stroke-my-green-med">{icon}</span>
            <p className="text-my-black-med select-none">
              {selected.current?.join(" , ") || title}
            </p>
          </div>
          <ChevronUp
            className={`text-my-black-low transition-all duration-300 ${
              isVisible ? "" : "rotate-180"
            }`}
          />
        </label>
        {
          <div
            className={`grid gap-2 p-3 mt-3 absolute bg-my-white-med dark:bg-my-black-high dark:text-my-white-low w-full max-h-52 rounded-lg border z-50 overflow-y-scroll transition-all duration-300 ${
              isVisible && data ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            {data.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-2 cursor-pointer"
                onInput={() => handleInputTitle(item.name)}
              >
                <input
                  type={multiple ? "checkbox" : "radio"}
                  value={item.id}
                  {...register}
                  className="h-4 w-4 text-my-green-med focus:ring-my-green-high"
                />
                <span>{item.name}</span>
              </label>
            ))}
          </div>
        }
      </div>
      {error && (
        <p className="text-my-red-med text-xs font-semibold mt-2 ml-5">
          {error}
        </p>
      )}
    </section>
  );
}
