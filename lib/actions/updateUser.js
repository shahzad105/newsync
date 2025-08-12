"use server";

import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import dbConnect from "../DB";
import { deleteFile, uploadImage } from "@/utils/cloudinary";
import Activity from "@/models/activity";

export async function updateUser({ username, password, image }) {
  try {
    await dbConnect();
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, message: "Unauthorized" };
    }

    if (!username && !password && !image) {
      return {
        success: false,
        message: "Please provide at least one field to update",
      };
    }

    const userId = session.user.id;
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return { success: false, message: "User not found" };
    }

    let didChangePassword = false;
    let didUpdateProfile = false;

    if (username && username !== user.username) {
      user.username = username;
      didUpdateProfile = true;
    }

    if (password) {
      if (password !== user.password) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          return {
            success: false,
            message: "Current password is incorrect",
          };
        }
      }
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return {
          success: false,
          message:
            "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character.",
        };
      }
      user.password = password;
      didChangePassword = true;
    }

    if (image && image !== user.avatar?.url) {
      if (user.avatar?.public_id) {
        await deleteFile(user.avatar.public_id);
      }
      const myCloud = await uploadImage(image, "avatar");
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.url,
      };
      didUpdateProfile = true;
    }

    await user.save();

    if (didUpdateProfile) {
      await Activity.findOneAndUpdate(
        {
          user: user._id,
          action: "Updated profile information",
          type: "profile",
        },
        { date: new Date() },
        { upsert: true, new: true }
      );
    }

    if (didChangePassword) {
      await Activity.findOneAndUpdate(
        {
          user: user._id,
          action: "Changed password",
          type: "security",
        },
        { date: new Date() },
        { upsert: true, new: true }
      );
    }
    const updatedUser = user.toObject();

    return {
      success: true,
      message: "User updated successfully",
      user: {
        username: String(updatedUser.username),
        avatar: updatedUser.avatar
          ? {
              public_id: String(updatedUser.avatar.public_id),
              url: String(updatedUser.avatar.url),
            }
          : null,
      },
    };
  } catch (error) {
    console.error("Update User Error:", error);
    return {
      success: false,
      message: "Something went wrong. Try again later.",
    };
  }
}
