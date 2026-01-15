import { Metadata } from "next";
import PageTitle from "../_components/PageTitle";
import LoginView from "../_components/LoginView";

export const metadata: Metadata = {
  title: "Login",
  description: "Login To Musiland",
};

export default function LoginPage() {
  return (
    <>
      <PageTitle title="Login" />
      <LoginView />
    </>
  );
}
