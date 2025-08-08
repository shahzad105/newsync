// utils/handleApiError.js
import { NextResponse } from "next/server";

export function handleApiError(error) {
  const status = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  return NextResponse.json({ success: false, message }, { status });
}
