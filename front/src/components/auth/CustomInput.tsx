import React from "react";

interface CustomInputProps {
  icon: React.ReactNode;
  name: string;
  value: string;
  valueSetter: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  icon,
  name,
  value,
  valueSetter,
  error,
}) => {
  return (
    <section>
      <div className="relative">
        {icon}
        <input
          value={value}
          onChange={(e) => valueSetter(e.target.value)}
          className="mt-1 p-3 ps-10 w-full bg-gray-700 outline-none border-none rounded-full text-emerald-500 caret-emerald-500 placeholder:text-gray-500"
          placeholder={name}
          type="text"
        />
      </div>
      {error && <p className="text-red-500 ml-5">{error}</p>}
    </section>
  );
};

export default CustomInput;
