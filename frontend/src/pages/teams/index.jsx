import React from "react";
import DashboardLayout from "@/Layout/DashboardLayout";
import UserLayout from "@/Layout/UserLayout";
import { useRouter } from "next/router";

export default function teamsPage() {
  return (
    <UserLayout>
      <DashboardLayout>
        <div>teamsPage</div>
      </DashboardLayout>
    </UserLayout>
  );
}
