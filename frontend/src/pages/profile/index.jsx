import DashboardLayout from "@/Layout/DashboardLayout";
import UserLayout from "@/Layout/UserLayout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import axios from "axios";

export default function ProfilePage() {
  const authState = useSelector((state) => state.auth);
  const user = authState.user.name;
  console.log(user, "user from profile page");
  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (!user?._id) return;
        const res = await axios.get(`/api/posts/user/${user._id}`);
        setUserPosts(res.data);
      } catch (err) {
        console.error("Error loading user posts", err);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchUserPosts();
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <img
              className={styles.profileImage}
              src={
                user?.profilePicture !== "no profile"
                  ? user.profilePicture
                  : "/default-profile.png"
              }
              alt="profile"
            />
            <div className={styles.userInfo}>
              <h2>{authState.user.name || "Unknown User"}</h2>
              <p>@{authState.user.username}</p>
              <p>{user.bio || "No bio added yet."}</p>
              <div className={styles.socialLinks}>
                {user.socialLinks?.linkedin && (
                  <a href={user.socialLinks.linkedin} target="_blank">
                    <FaLinkedin />
                  </a>
                )}
                {user.socialLinks?.github && (
                  <a href={user.socialLinks.github} target="_blank">
                    <FaGithub />
                  </a>
                )}
                {user.socialLinks?.website && (
                  <a href={user.socialLinks.website} target="_blank">
                    <FaGlobe />
                  </a>
                )}
              </div>
              <div className={styles.stats}>
                <span>{user.followers?.length || 0} followers</span>
                <span>{user.following?.length || 0} following</span>
              </div>
            </div>
          </div>

          <div className={styles.extraInfo}>
            <h3>Skills</h3>
            <ul>
              {user.skills?.length > 0 ? (
                user.skills.map((skill, index) => <li key={index}>{skill}</li>)
              ) : (
                <li>No skills added</li>
              )}
            </ul>

            <h3>Achievements</h3>
            <ul>
              {user.achievements?.length > 0 ? (
                user.achievements.map((ach, index) => (
                  <li key={index}>{ach}</li>
                ))
              ) : (
                <li>No achievements yet</li>
              )}
            </ul>

            <h3>Projects</h3>
            <ul>
              {user.projects?.length > 0 ? (
                user.projects.map((project, index) => (
                  <li key={index}>{project.title || "Untitled Project"}</li>
                ))
              ) : (
                <li>No projects added</li>
              )}
            </ul>
          </div>

          <div className={styles.postsGridContainer}>
            <h3 style={{ marginTop: "30px" }}>Posts</h3>
            {loadingPosts ? (
              <p>Loading posts...</p>
            ) : userPosts.length === 0 ? (
              <p>No posts yet</p>
            ) : (
              <div className={styles.postsGrid}>
                {userPosts.map((post) => (
                  <div className={styles.postItem} key={post._id}>
                    <img
                      src={post.imageUrl || "/placeholder-image.jpg"}
                      alt="user post"
                      className={styles.postImage}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
