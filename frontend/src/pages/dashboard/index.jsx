import { getAboutUser, getAllUsers } from "@/config/redux/action/authAction";
import { getPosts } from "@/config/redux/action/postAction";
import DashboardLayout from "../../Layout/DashboardLayout/index";
import UserLayout from "@/Layout/UserLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function dashboard() {
  const router = useRouter();

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.isTokenThere) {
      dispatch(getPosts());
      dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    }
    if (!authState.allProfilesFetched) {
      dispatch(getAllUsers());
    }
  }, [authState.isTokenThere]);

  return (
    <UserLayout>
      <DashboardLayout>
        <h1>Dashboard</h1>
      </DashboardLayout>
    </UserLayout>
  );
}
