"use server";

import User from "@/models/user";
import dbConnect from "../DB";
import { auth } from "@/auth";
import { deleteFile } from "@/utils/cloudinary";

export default async function deleteUser(id) {
  const sessoin = await auth();
  if (!sessoin?.user.isAdmin) {
    return { success: false, message: "Unauthorized" };
  }
  try {
    await dbConnect();

    const user = await User.findById(id);
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (user.avatar?.public_id) {
      await deleteFile(user.avatar.public_id);
    }
    await user.deleteOne();

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
