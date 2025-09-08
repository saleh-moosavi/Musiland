import { Metadata } from "next";
import { lazy, Suspense } from "react";
import Loading from "@/components/shared/Loading";
const RegisterView = lazy(() => import("@/components/auth/RegisterView"));

export const metadata: Metadata = {
  title: "Register",
  description: "Register To Musiland",
};

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto overflow-hidden p-5 rounded-3xl bg-my-white-low dark:bg-my-black-max mt-10 shadow-md dark:shadow-my-black-low/50">
      <h2 className="text-2xl font-bold text-my-black-max dark:text-my-white-low mb-6 text-center">
        Register
      </h2>
      <Suspense fallback={<Loading />}>
        <RegisterView />
      </Suspense>
    </div>
  );
}
