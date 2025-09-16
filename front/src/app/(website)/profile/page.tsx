import { Metadata } from "next";
import ProfileView from "@/components/profile/ProfileView";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your Musiland Profile",
};

export default function ProfilePage() {
  return <ProfileView />;
}
