import useUserStore from "@/store/userStore";

export default async function checkSavedData() {
  let userData;
  const res = await fetch("/api/getUserData", {
    method: "GET",
    credentials: "include",
  });
  if (res.ok) {
    const data = await res.json();
    if (data) {
      const userStore = useUserStore.getState();
      userStore.setIsLoggedIn(true);
      userData = {
        userName: data.user.username,
        email: data.user.email,
        createdAt: data.user.createdAt,
      };
    }
  }
  return userData;
}
