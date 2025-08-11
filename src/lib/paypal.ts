import { loadScript, PayPalNamespace } from "@paypal/paypal-js";

export const loadPaypal = async (): Promise<PayPalNamespace> => {
  const paypalNamespace = await loadScript({
    clientId: process.env.PAYPAL_CLIENT_ID ?? "",
  });

  if (!paypalNamespace) {
    throw new Error("Failed to load PayPal script");
  }

  return paypalNamespace;
};
