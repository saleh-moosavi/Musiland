import Link from "next/link";

export default function ChangeLoginRegister({
  to,
}: {
  to: "login" | "register";
}) {
  return (
    <h3 className="text-my-black-max dark:text-my-white-low text-sm">
      {to === "login" ? "Have an Account ? " : "Create an Account ? "}
      <Link
        href={to === "login" ? "/login" : "/register"}
        className="text-my-blue-med cursor-pointer"
      >
        {to === "login" ? "Login" : "Register"}
      </Link>
    </h3>
  );
}
