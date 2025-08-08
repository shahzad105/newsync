export default async function handleLogout() {
  await signOut({
    callbackUrl: "/",
  });
}
