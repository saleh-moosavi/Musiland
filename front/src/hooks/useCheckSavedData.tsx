import { useEffect, useState } from "react";

export default function useCheckSavedData() {
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    const checkData = async () => {
      const res = await fetch("/api/getUserData", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data) {
        setUserData(data.user);
      }
    };
    checkData();
  }, []);
  return { userData };
}
