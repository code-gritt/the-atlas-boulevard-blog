import { Button } from "@/components/ui/Button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const PricingPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/api/auth/login");
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40 dark:bg-muted-dark/40 pt-20 items-center justify-center transition-colors duration-300">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Upgrade for More Credits
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Get 500 credits for $10 (example price).
        </p>
        <form action="/api/create-paypal-order" method="POST">
          <Button type="submit">Upgrade</Button>
        </form>
      </div>
    </div>
  );
};

export default PricingPage;
