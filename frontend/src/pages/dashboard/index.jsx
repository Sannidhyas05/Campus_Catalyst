import { getAboutUser, getAllUsers } from "@/config/redux/action/authAction";
import { createPost, getPosts } from "@/config/redux/action/postAction";
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

  useEffect(() => {}, [authState.profile]);

  const [postContent, setPostContent] = useState("");
  const [fileContent, setFileContent] = useState();

  const handleUpload = async () => {
    if (!postContent.trim() && !fileContent) {
      return;
    }

    const formData = new FormData();
    formData.append("body", postContent);
    if (fileContent) {
      formData.append("media", fileContent);
    }

    await dispatch(createPost(formData));
    setPostContent("");
    setFileContent(null);
  };

  if (authState.user) {
    return (
      <UserLayout>
        <DashboardLayout>
          <div className="scrollComponent">
            <div className={styles.createPostContainer}>
              <img
                src={`${BASE_URL}/${authState.profile.profilePicture}`}
                alt="Profile Picture"
              ></img>
              <textarea
                onChange={(e) => setPostContent(e.target.value)}
                value={postContent}
                placeholder="What are you thinking tooday?"
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
                {postContent.length > 0 && (
                  <div onClick={handleUpload} className={styles.uploadButton}>
                    {" "}
                    Post
                  </div>
                )}
              </div>
            </div>
          </div>
        </DashboardLayout>
      </UserLayout>
    );
  } else {
    return (
      <UserLayout>
        <DashboardLayout>
          <h2>Loading...</h2>
        </DashboardLayout>
      </UserLayout>
    );
  }
}
