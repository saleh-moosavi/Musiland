interface CustomInputProps {
  name: string;
  register: any;
  icon: React.ReactNode;
  error?: React.ReactNode | string;
  classes?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  register,
  icon,
  name,
  error,
  classes,
}) => {
  return (
    <section className={classes ? classes : ""}>
      <div className="relative w-full">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 *:size-5 *:stroke-emerald-500">
          {icon}
        </span>
        <input
          {...register}
          className="p-3 ps-10 w-full bg-slate-200 dark:bg-gray-700 outline-none border-none rounded-full text-emerald-500 caret-emerald-500 placeholder:text-gray-500"
          placeholder={name}
          type="text"
        />
      </div>
      {error && typeof error === "string" && (
        <p className="text-red-500 text-xs font-semibold mt-2 ml-5">{error}</p>
      )}
    </section>
  );
};

export default CustomInput;
