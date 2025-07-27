"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import { useEffect, useState } from "react";
import { LockIcon, MailIcon } from "lucide-react";
import CustomInput from "@/components/auth/CustomInput";
import { validateSignInForm } from "@/libs/validateSignInForm";

const iconClasses =
  "absolute left-2 top-1/2 -translate-y-1/3 size-5 stroke-emerald-500";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>();
  const [IsPending, setIsPending] = useState<boolean>(false);
  const router = useRouter(); // Initialize the router
  const { isLoggedIn, setIsLoggedIn } = useUserStore();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile"); // Navigate to Profile page
    }
  }, [isLoggedIn]); // Add isUserData as a dependency

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsPending(true);

    const newErrors = validateSignInForm(email, password);
    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
          credentials: "include",
        });

        const result = await res.json();

        if (res.ok) {
          // توکن JWT دریافتی رو ذخیره کن، مثلاً:
          localStorage.setItem("token", result.jwt);

          // یا به context یا cookie بفرست برای session
          setIsLoggedIn(true);
          router.push("/profile"); // هدایت به صفحه پروفایل
        } else {
          setError({
            server: result.error?.message || "نام کاربری یا رمز اشتباه است",
          });
        }
      } catch (err) {
        setError({ server: "خطا در ارتباط با سرور!" });
      }
    }

    setIsPending(false);
  };

  return (
    <div className="max-w-md mx-auto overflow-hidden p-5 rounded-3xl bg-slate-800">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Log In
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-y-5">
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

        <h3 className="text-white">
          Don`t` Have an Account ?{" "}
          <Link href={`/register`} className="text-cyan-400 cursor-pointer">
            Register
          </Link>
        </h3>
        {error?.server && <p className="text-red-500">{error.server}</p>}
        <button
          disabled={IsPending}
          className="bg-gradient-to-r from-cyan-700 to-emerald-400 text-white px-4 py-2 w-full font-bold rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
