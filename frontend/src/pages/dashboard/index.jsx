import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../config/redux/action/postAction/index";
import { getAboutUser } from "@/config/redux/action/authAction";
import UserLayout from "@/Layout/UserLayout";
import styles from "./styles.module.css";
import LeftSidebar from "./LeftSideBar/index";
import DashboardLayout from "@/Layout/DashboardLayout";
import FeedContainer from "../dashboard/feed/feedContainer";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [isTokenThere, setIsTokenThere] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      setIsTokenThere(true);
    }
  }, []);

  useEffect(() => {
    if (isTokenThere) {
      dispatch(getPosts());
      dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    }
  }, [isTokenThere]);

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.homeFeedContainer}>
          <div className={styles.feedContent}>
            <FeedContainer />
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
