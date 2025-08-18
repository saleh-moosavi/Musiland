import React from "react";

interface CustomInputProps {
  register: any;
  icon: React.ReactNode;
  name: string;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  register,
  icon,
  name,
  error,
}) => {
  return (
    <section>
      <div className="relative">
        {icon}
        <input
          {...register}
          className="mt-1 p-3 ps-10 w-full bg-slate-200 dark:bg-gray-700 outline-none border-none rounded-full text-emerald-500 caret-emerald-500 placeholder:text-gray-500"
          placeholder={name}
          type="text"
        />
      </div>
      {error && <p className="text-red-500 ml-5">{error}</p>}
    </section>
  );
};

export default CustomInput;
