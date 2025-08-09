import User from "@/models/user";
import { getVerificationEmailTemplate } from "@/utils/verificationTemplate";
import { sendEmail } from "@/utils/sendEmail";
import dbConnect from "@/lib/DB";
import { NextResponse } from "next/server";
import { handleApiError } from "@/utils/handleApiError";

export async function POST(req) {
  try {
    await dbConnect();
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      throw new handleApiError(
        "Please provide all required fields: username, email, and password.",
        400
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character.",
        },
        { status: 400 }
      );
    }

    const user = await User.create({ username, email, password });

    const token = user.getVerificationToken();
    await user.save({ validateBeforeSave: false });

    const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email/${token}?email=${email}`;
    const message = getVerificationEmailTemplate(username, verificationUrl);

    try {
      await sendEmail({
        email: user.email,
        subject: "Verify your email",
        message,
      });

      return NextResponse.json(
        {
          email: user.email,
          success: true,
          message:
            "Registration successful! Please check your email to verify your account.",
        },
        { status: 201 }
      );
    } catch (emailError) {
      user.verificationToken = undefined;
      user.verificationTokenExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return NextResponse.json(
        {
          success: false,
          message: "Failed to send verification email.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
