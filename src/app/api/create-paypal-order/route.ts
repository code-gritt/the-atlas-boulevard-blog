import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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

export async function POST(req: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = getPayPalClient();

  const orderRequest = new paypal.orders.OrdersCreateRequest();
  orderRequest.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "10.00", // price for credits or product
        },
      },
    ],
    application_context: {
      return_url: `${req.nextUrl.origin}/api/paypal-capture?userId=${user.id}`,
      cancel_url: `${req.nextUrl.origin}/pricing`,
    },
  });

  const response = await client.execute(orderRequest);
  const order = response.result;

  const approveUrl = order.links.find(
    (link: any) => link.rel === "approve"
  )?.href;

  if (!approveUrl) {
    return NextResponse.json(
      { error: "Unable to create PayPal order" },
      { status: 500 }
    );
  }

  return NextResponse.redirect(approveUrl);
}
