import { auth } from "@/auth";
import UpdateProfileComponent from "@/components/UpdateProfile";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Update Profile",
  description:
    "Manage and update your profile details including username, email, and avatar.",
  openGraph: {
    title: "Update Profile",
    description:
      "Manage and update your profile details including username, email, and avatar.",
    url: "https://newsync.site/profile/update",
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
  return <UpdateProfileComponent user={user} />;
}
