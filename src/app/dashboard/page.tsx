import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return <div className="flex min-h-screen w-full bg-muted/40">Gokul</div>;
};

export default DashboardPage;
