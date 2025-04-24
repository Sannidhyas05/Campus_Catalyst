import { getAllUsers } from "@/config/redux/action/authAction";
import DashboardLayout from "@/Layout/DashboardLayout";
import UserLayout from "@/Layout/UserLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function explorePage() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authState.allProfilesFetched) {
      dispatch(getAllUsers());
    }
  }, [dispatch]);

  return (
    <UserLayout>
      <DashboardLayout>
        <div>explore</div>
      </DashboardLayout>
    </UserLayout>
  );
}
