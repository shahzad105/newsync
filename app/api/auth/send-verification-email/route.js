import dbConnect from "@/lib/DB";
import User from "@/models/user";
import { sendEmail } from "@/utils/sendEmail";
import { getVerificationEmailTemplate } from "@/utils/verificationTemplate";

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
    // Generate email verification token
    const token = user.getVerificationToken();
    await user.save({ validateBeforeSave: false });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}?email=${email}`;
    const message = getVerificationEmailTemplate(
      user.username,
      verificationUrl
    );
    try {
      await sendEmail({
        email: user.email,
        subject: "Verify your email",
        message,
      });
      return Response.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 }
      );
    } catch (emailError) {
      // Clear tokens if email fails
      user.verificationToken = undefined;
      user.verificationTokenExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return Response.json(
        { success: false, message: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
