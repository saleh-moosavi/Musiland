"use client";

import useUserStore from "@/store/userStore";

export default function ProfileView() {
  const { userData } = useUserStore();
  if (userData)
    return (
      <ul className="list-none flex flex-col gap-10 justify-self-start">
        <li>
          <strong>Username:</strong> {userData.name}
        </li>
        <li>
          <strong>Email:</strong> {userData.email}
        </li>
        <li>
          <strong>Role: </strong>
          {userData.role}
        </li>
      </ul>
    );
}
