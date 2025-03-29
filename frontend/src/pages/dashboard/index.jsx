import { getAboutUser, getAllUsers } from "@/config/redux/action/authAction";
import { getPosts } from "@/config/redux/action/postAction";
import DashboardLayout from "../../Layout/DashboardLayout/index";
import UserLayout from "@/Layout/UserLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { BASE_URL } from "@/config";

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
        <div className="scrollComponent">
          <div className={styles.createPostContainer}>
            {/* <img
              src={`${BASE_URL}/${authState.user.userId.profilePicture}`}
              alt=""
            ></img> */}
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
