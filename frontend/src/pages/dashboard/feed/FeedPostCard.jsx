import React from "react";
import styles from "./styles.module.css";
import { BASE_URL } from "@/config";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPosts } from "@/config/redux/action/postAction/index";
import { useState } from "react";

export default function FeedPostCard({ post }) {
  if (!post) return null;
  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.posts);
  const { profile } = authState;
  const { user } = authState;
  const authorProfilePic = profile?.profilePicture
    ? `${BASE_URL}/${post?.userId?.profile?.profilePicture.replace(/\\/g, "/")}`
    : `${BASE_URL}/uploads/default.jpg`;

  const { media, content, userId, createdAt } = post;

  console.log("post profile", post?.userId?.profile?.profilePicture);

  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  function getTimeAgo(createdAt) {
    const postDate = new Date(createdAt);
    const now = new Date();
    const diff = Math.floor((now - postDate) / 1000);

    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
  }

  return (
    <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <img
          className={styles.userAvatar}
          src={authorProfilePic}
          alt="User Avatar"
        />
        <div className={styles.userInfo}>
          <div className={styles.usernameRow}>
            <span>{userId?.username || "Unknown User"}</span>
            <p className={styles.timeText}>• {getTimeAgo(createdAt)}</p>
          </div>
        </div>
      </div>

      <div className={styles.postContent}>
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
      {/* Post Content Text */}
      <div className={styles.postDetails}>
        <p className={styles.postCaption}>
          <span style={{ color: "rgb(139, 138, 138)", fontSize: "12px" }}>
            {post?.userId?.name || "Unknown User"}
          </span>{" "}
          {content}
        </p>
      </div>
      {/* Post Actions (like, comment, share) */}
      <div className={styles.postActions}>
        <div className={styles.actionIcons}>
          {/* Like */}
          <div className={styles.likebutton}>
            <svg
              onClick={handleLike}
              xmlns="http://www.w3.org/2000/svg"
              fill={liked ? "red" : "none"}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={liked ? "red" : "currentColor"}
              className={styles.actionIcon}
              style={{
                width: "24px",
                height: "24px",
                cursor: "pointer",
                color: "rgb(139, 138, 138)",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>

          {/* Comment */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.actionIcon}
            style={{
              width: "24px",
              height: "24px",
              cursor: "pointer",
              color: "rgb(139, 138, 138)",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>

          {/* Share */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.actionIcon}
            style={{
              width: "24px",
              height: "24px",
              cursor: "pointer",
              color: "rgb(139, 138, 138)",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186Zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185Z"
            />
          </svg>
        </div>
        <div>
          <p className={styles.viewComments}>View comments</p>
        </div>
      </div>
    </div>
  );
}
