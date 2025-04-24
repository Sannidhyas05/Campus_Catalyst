import React from "react";
import DashboardLayout from "@/Layout/DashboardLayout";
import UserLayout from "@/Layout/UserLayout";
import { useRouter } from "next/router";

export default function requestsPage() {
  return (
    <UserLayout>
      <DashboardLayout>
        <div>requestsPage</div>
      </DashboardLayout>
    </UserLayout>
  );
}
