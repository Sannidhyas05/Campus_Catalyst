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

  console.log("post profile", post.media);

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
          <span>@{userId?.username || "Unknown User"}</span>
          <p>~{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className={styles.postContent}>
        <p>{content}</p>
        {Array.isArray(media) && media.length > 0 && (
          <img
            className={styles.postImage}
            src={`${BASE_URL}${media[0].url}`}
            alt="Post Media"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
      </div>
    </div>
  );
}
