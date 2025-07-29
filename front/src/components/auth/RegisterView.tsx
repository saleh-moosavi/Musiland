"use client";
import { useEffect, useState } from "react";
import CustomInput from "@/components/auth/CustomInput";
import { AtSign, LockIcon, MailIcon } from "lucide-react";
import { validateSignUpForm } from "@/libs/validateSignUpForm";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useUserStore from "@/store/userStore";
import Loading from "@/components/shared/Loading";

const iconClasses =
  "absolute left-2 top-1/2 -translate-y-1/3 size-5 stroke-emerald-500";

export default function RegisterView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // اضافه شد
  const router = useRouter();
  const { isLoggedIn } = useUserStore();

  // بررسی وضعیت ورود و تعیین لودینگ
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile");
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsPending(true);

    const newErrors = validateSignUpForm(name, email, password);
    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: name,
            email,
            password,
          }),
          credentials: "include",
        });

        const result = await res.json();

        if (res.ok) {
          console.log("Successful");
          router.push("/profile");
        } else {
          setError({ server: result.error });
        }
      } catch (err) {
        setError({ server: "Server Error!" });
      }
    }

    setIsPending(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-y-5">
      <CustomInput
        icon={<AtSign className={iconClasses} />}
        name="Username"
        value={name}
        valueSetter={setName}
        error={error?.name}
      />
      <CustomInput
        icon={<MailIcon className={iconClasses} />}
        name="Email"
        value={email}
        valueSetter={setEmail}
        error={error?.email}
      />
      <CustomInput
        icon={<LockIcon className={iconClasses} />}
        name="Password"
        value={password}
        valueSetter={setPassword}
        error={error?.password}
      />

      <h3 className="text-black dark:text-white">
        Do You Have an Account?{" "}
        <Link href={`/login`} className="text-cyan-400 cursor-pointer">
          Log In
        </Link>
      </h3>
      {error?.server && <p className="text-red-500">{error.server}</p>}
      <button
        disabled={isPending}
        className="bg-gradient-to-r from-cyan-700 to-emerald-400 text-white px-4 py-2 w-full font-bold rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
