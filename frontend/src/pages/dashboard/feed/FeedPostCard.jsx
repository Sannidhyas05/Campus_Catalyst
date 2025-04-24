import React from "react";
import styles from "./styles.module.css";
import { BASE_URL } from "@/config";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPosts } from "@/config/redux/action/postAction/index";

export default function FeedPostCard({ post }) {
  if (!post) return null;
  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.posts);
  const { profile } = authState;
  const { user } = authState;
  const authorProfilePic = profile?.profilePicture
    ? `${BASE_URL}/${profile?.profilePicture.replace(/\\/g, "/")}`
    : `${BASE_URL}/uploads/default.jpg`;

  console.log("post profile", profile?._id);

  const { media, content, userId, createdAt } = post;

  return (
    <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <img
          className={styles.userAvatar}
          src={authorProfilePic}
          alt="User Avatar"
        />
        <div className={styles.userInfo}>
          <div>
            @{userId?.username || "Unknown User"}{" "}
            <p style={{ fontSize: "10px", color: "gray" }}>
              ~{new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.postContent}>
        <p>{content}</p>
        {media && (
          <img
            className={styles.postImage}
            src={`${BASE_URL}${media}`}
            alt="Post Media"
            onError={(e) => {
              "no image";
            }}
          />
        )}
      </div>
    </div>
  );
}
