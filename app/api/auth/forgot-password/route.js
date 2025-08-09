import dbConnect from "@/lib/DB";
import User from "@/models/user";
import { getForgotPasswordEmailTemplate } from "@/utils/forgotPasswordTemplate";
import { sendEmail } from "@/utils/sendEmail";

export async function POST(req) {
  try {
    await dbConnect();

    const { email } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;
    const message = getForgotPasswordEmailTemplate(user.username, resetUrl);

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset your password",
        message,
      });

      return Response.json(
        { success: true, message: "Reset email sent successfully" },
        { status: 200 }
      );
    } catch (emailErr) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return Response.json(
        { success: false, message: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (err) {
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
