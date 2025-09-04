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
        <span
          className={
            classes
              ? classes
              : "absolute left-2 top-1/2 -translate-y-1/2 *:size-5 *:stroke-my-green-med"
          }
        >
          {icon}
        </span>
        <input
          {...register}
          className="p-3 ps-12 w-full bg-my-white-med outline-none border-none rounded-full text-my-green-high caret-my-green-high placeholder:text-my-black-med focus:bg-my-white-high"
          placeholder={name}
          type="text"
        />
      </div>
      {error && typeof error === "string" && (
        <p className="text-my-red-med text-xs font-semibold mt-2 ml-5">
          {error}
        </p>
      )}
    </section>
  );
};

export default CustomInput;
