import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setTokenIsThere } from "@/config/redux/reducer/authReducer";
import LeftSidebar from "../../pages/dashboard/LeftSideBar/index"; // adjust path if needed
import { getAllUsers } from "@/config/redux/action/authAction";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      dispatch(setTokenIsThere());
    }
  }, []);
  useEffect(() => {
    if (!authState.allProfilesFetched) {
      dispatch(getAllUsers());
    }
  }, [dispatch]);

  return (
    <div className={styles.Container}>
      <div className={styles.homeContainer}>
        <div className={styles.homeContainer__leftBar}>
          <LeftSidebar />
        </div>

        <div className={styles.feedContainer}>{children}</div>

        <div className={styles.extraContainer}>
          <h4>Top Profiles</h4>
          {authState.allProfilesFetched && authState.allUsers?.length > 0 ? (
            authState.allUsers.map((profile) => (
              <div key={profile._id} className={styles.extraContainer_profiles}>
                <p>{profile.user?.username || profile.user?.name}</p>
              </div>
            ))
          ) : (
            <p>No profiles found</p>
          )}
        </div>
      </div>
    </div>
  );
}
