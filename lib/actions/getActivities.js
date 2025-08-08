// app/actions/activities.ts
"use server";

import { auth } from "@/auth";
import dbConnect from "../DB";
import Activity from "@/models/activity";

export async function getActivities() {
  const session = await auth();
  if (!session?.user) {
    return { success: false, messsage: "Unautorized" };
  }

  await dbConnect();
  const acts = await Activity.find({ user: session.user.id }).sort({
    date: -1,
  });
  return acts;
}
