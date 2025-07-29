import { lazy, Suspense } from "react";
import Loading from "@/components/shared/Loading";
const RegisterView = lazy(() => import("@/components/auth/RegisterView"));

export default function Page() {
  return (
    <div className="max-w-md mx-auto overflow-hidden p-5 rounded-3xl bg-slate-100 dark:bg-slate-800 mt-10 shadow dark:shadow-white/30">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">
        Register
      </h2>
      <Suspense fallback={<Loading />}>
        <RegisterView />
      </Suspense>
    </div>
  );
}
