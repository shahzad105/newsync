import User from "@/models/user";
import Activity from "@/models/activity";
import crypto from "crypto";
import dbConnect from "@/lib/DB";

export async function POST(_, { params }) {
  try {
    await dbConnect();

    const { token } = params;

    if (!token) {
      return Response.json(
        { success: false, message: "Invalid token" },
        { status: 400 }
      );
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return Response.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      );
    }
    if (user.isVerified) {
      return Response.json(
        { success: false, message: "User is already verified" },
        { status: 400 }
      );
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    await Activity.create({
      user: user._id,
      action: "Verified email address",
      type: "verification",
    });
    return Response.json(
      { success: true, message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Server error during verification" },
      { status: 500 }
    );
  }
}
