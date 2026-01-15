import { Metadata } from "next";
import PageTitle from "../_components/PageTitle";
import RegisterView from "../_components/RegisterView";

export const metadata: Metadata = {
  title: "Register",
  description: "Register To Musiland",
};

export default function RegisterPage() {
  return (
    <>
      <PageTitle title="Register" />
      <RegisterView />
    </>
  );
}
