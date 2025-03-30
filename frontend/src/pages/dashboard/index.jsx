import { getAboutUser, getAllUsers } from "@/config/redux/action/authAction";
import { createPost, getPosts } from "@/config/redux/action/postAction";
import DashboardLayout from "../../Layout/DashboardLayout/index";
import UserLayout from "@/Layout/UserLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { BASE_URL } from "@/config";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.isTokenThere) {
      dispatch(getPosts());
      dispatch(
        getAboutUser({
          token: authState.token || localStorage.getItem("token"),
        })
      );
    }
    if (!authState.allProfilesFetched) {
      dispatch(getAllUsers());
    }
  }, [authState.isTokenThere]);

  const [postType, setPostType] = useState("");
  const [postContent, setPostContent] = useState("");
  const [fileContent, setFileContent] = useState(null);

  const handleUpload = () => {
    if (!postType) {
      console.error("❌ postType is missing in `handleUpload`!");
      return;
    }
    if (!content?.trim() && !file) {
      console.error("❌ Content or media is required!");
      return;
    }

    const postData = {
      postType, // Ensure postType is included
      content, // Ensure content is included
      file, // Ensure file is included
    };

    console.log("📤 Dispatching Post Data:", postData);

    dispatch(createPost(postData));
  };

  if (!authState.user) {
    return (
      <UserLayout>
        <DashboardLayout>
          <h2>Loading...</h2>
        </DashboardLayout>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <DashboardLayout>
        <div className="scrollComponent">
          <div className={styles.createPostContainer}>
            <img
              src={
                authState.profile?.profilePicture
                  ? `${BASE_URL}/${authState.profile.profilePicture}`
                  : "/default-profile.png"
              }
              alt="Profile Picture"
            />
            <textarea
              onChange={(e) => setPostContent(e.target.value)}
              value={postContent}
              placeholder="What are you thinking today?"
            />
            <div className={styles.fabContainer}>
              <label htmlFor="fileUpload">
                <div className={styles.fab}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </div>
              </label>
              <input
                onChange={(e) => setFileContent(e.target.files[0])}
                type="file"
                hidden
                id="fileUpload"
              />
              {(postContent.length > 0 || fileContent) && (
                <div onClick={handleUpload} className={styles.uploadButton}>
                  Post
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
