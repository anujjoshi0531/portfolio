export function getUserId() {
  if (typeof window === "undefined") return null;

  let userId = localStorage.getItem("portfolio-user-id");

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("portfolio-user-id", userId);
  }

  return userId;
}
