import { useEffect } from "react";

export default function useCheckSavedData() {
  let isUserData;
  let userData;
  useEffect(() => {
    const checkData = async () => {
      const res = await fetch("/api/getUserData", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data) {
        userData = data;
        isUserData = true;
      } else {
        userData = null;
        isUserData = false;
      }
    };
    checkData();
  }, []);
  return { isUserData, userData };
}
