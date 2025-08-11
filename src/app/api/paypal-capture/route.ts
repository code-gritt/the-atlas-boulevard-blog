import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import paypal from "@paypal/checkout-server-sdk";

function getPayPalClient() {
  const environment =
    process.env.NODE_ENV === "production"
      ? new paypal.core.LiveEnvironment(
          "AQ2xrVh_Yg5wrf_GIm-iHRZ51aE5WT75sfpP1fTY6EZP1z122DX6o7qoX5ft2Fhq_2kE2oThif-ZLmSQ",
          "EKEMx4AL8dQTSUkfJgw4n9FHOgo0TnS2mHDAh2QkctDHpZ7P3q9fFg6YNRepfTyK9hLaZZXwYJNkbHG8"
        )
      : new paypal.core.SandboxEnvironment(
          process.env.PAYPAL_CLIENT_ID!,
          process.env.PAYPAL_CLIENT_SECRET!
        );

  return new paypal.core.PayPalHttpClient(environment);
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  if (!token || !userId) {
    return NextResponse.redirect(new URL("/pricing", req.url));
  }

  const client = getPayPalClient();

  const captureRequest = new paypal.orders.OrdersCaptureRequest(token);

  try {
    await client.execute(captureRequest);

    await db.user.update({
      where: { id: userId },
      data: { credits: { increment: 500 } },
    });

    return NextResponse.redirect(new URL("/", req.url));
  } catch (error) {
    console.error("PayPal capture error:", error);
    return NextResponse.redirect(new URL("/pricing?error=failed", req.url));
  }
}
