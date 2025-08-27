import { auth } from "@/auth";
import UpdateProfileComponent from "@/components/UpdateProfile";
import { updateUser } from "@/lib/actions/updateUser";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Update Profile",
  description:
    "Manage and update your profile details including username, email, and avatar.",
  openGraph: {
    title: "Update Profile",
    description:
      "Manage and update your profile details including username, email, and avatar.",
    url: "https://www.newsyn.site/profile/update",
    siteName: "Newsync",
    images: [
      {
        url: "/user.png",
        width: 800,
        height: 600,
        alt: "Profile Update",
      },
    ],
    type: "website",
  },
};

export default async function UpdateProfile() {
  const session = await auth();
  if (!session?.user) return redirect("/auth/login");
  const user = session?.user;
  const handleSubmit = async (prevState, formData) => {
    "use server";
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const image = formData.get("image");

    if (password !== confirmPassword)
      return { success: false, message: "Passwords do not match" };

    const result = await updateUser({ username, password, image });

    return result;
  };

  return <UpdateProfileComponent user={user} action={handleSubmit} />;
}
