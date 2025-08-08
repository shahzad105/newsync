"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/actions/updateUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UpdateProfileComponent({ user }) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        password: "",
        confirmPassword: "",
        image: user.avatar?.url || "",
      });
      setPreviewImage(user.avatar?.url || "");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const result = await updateUser(formData);
      if (result?.success) {
        toast.success("Profile updated successfully");

        setFormData((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
        }));

        // Update session locally with new profile data
        await update({
          username: result.user.username,
          avatar: result.user.avatar,
        });
        router.refresh();
      } else {
        toast.error(result?.message || "Update failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          Account Settings
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar Upload */}
          <div className="flex items-center gap-6">
            <label className="relative cursor-pointer group">
              <div className="relative w-20 h-20 rounded-full overflow-hidden ring-1 ring-gray-300 group-hover:ring-blue-500 transition">
                <Image
                  src={previewImage || "/user.png"}
                  alt="avatar"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleChange}
                className="hidden"
              />
              <span className="absolute bottom-0 right-0 bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full">
                {/* SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </span>
            </label>
            <div className="text-sm text-gray-500">
              Click on image to update your avatar
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-blue-500 text-gray-800"
              autoComplete="username"
              required
            />
          </div>

          {/* Password Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-blue-500 text-gray-800"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-blue-500 text-gray-800"
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white text-sm px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
