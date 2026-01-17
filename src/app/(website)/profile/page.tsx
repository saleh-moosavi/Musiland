import { Metadata } from "next";
import ProfileView from "@/app/(website)/profile/_components/ProfileView";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your Musiland Profile",
};

export default function ProfilePage() {
  return <ProfileView />;
}
