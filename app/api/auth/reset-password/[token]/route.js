import dbConnect from "@/lib/DB";
import Activity from "@/models/activity";
import User from "@/models/user";
import crypto from "crypto";
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { token } = params;

    const { password } = await req.json();

    if (!token || !password) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return Response.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return Response.json(
        {
          success: false,
          message:
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
        { status: 400 }
      );
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    await Activity.findOneAndUpdate(
      { user: user._id, action: "Reset password", type: "security" },
      { date: new Date() },
      { upsert: true, new: true }
    );

    return Response.json(
      { success: true, message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
