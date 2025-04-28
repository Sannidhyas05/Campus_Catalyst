import React, { useState } from "react";
import styles from "./styles.module.css";
import { BASE_URL } from "@/config";
import { useSelector } from "react-redux";
import DashboardLayout from "@/Layout/DashboardLayout";
import UserLayout from "@/Layout/UserLayout";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");

  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const { profile } = authState;

  const profileImage = profile?.profilePicture
    ? `${BASE_URL}/${profile.profilePicture.replace(/\\/g, "/")}`
    : `${BASE_URL}/uploads/default.jpg`;

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    const { id } = Router.query;
    const [profileData, setProfileData] = useState(null);
  };

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.profileContainer}>
          {/* Profile Top Section */}
          <div className={styles.topSection}>
            <img
              className={styles.profileImage}
              src={profileImage}
              alt="Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${BASE_URL}/uploads/default.jpg`;
              }}
            />
            <div className={styles.profileDetails}>
              <h2>{user?.username || "Unknown User"}</h2>
              <p className={styles.name}>{user?.name || "No name"}</p>
              <p className={styles.email}>{user?.email || "No email"}</p>
              {profile?.bio && <p className={styles.bio}>{profile.bio}</p>}

              <div className={styles.stats}>
                <div>
                  <strong>{profile?.postsCount ?? 0}</strong>
                  <span>Posts</span>
                </div>
                <div>
                  <strong>{profile?.followersCount ?? 0}</strong>
                  <span>Followers</span>
                </div>
                <div>
                  <strong>{profile?.followingCount ?? 0}</strong>
                  <span>Following</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={activeTab === "posts" ? styles.activeTab : ""}
              onClick={() => handleTabClick("posts")}
            >
              Posts
            </button>
            <button
              className={activeTab === "projects" ? styles.activeTab : ""}
              onClick={() => handleTabClick("projects")}
            >
              Projects
            </button>
          </div>

          {/* Grid Content */}
          <div className={styles.gridContainer}>
            {activeTab === "posts" ? (
              <PostsGrid
                posts={
                  profile?.media?.map((item) => ({
                    image: `${BASE_URL}/${item.url.replace(/\\/g, "/")}`,
                  })) || []
                }
              />
            ) : (
              <ProjectsGrid
                projects={
                  profile?.projects?.map((project) => ({
                    image: `${BASE_URL}/${project.image.replace(/\\/g, "/")}`,
                  })) || []
                }
              />
            )}
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}

// -------------------
// Posts Grid
function PostsGrid({ posts }) {
  return (
    <div className={styles.grid}>
      {posts.length > 0 ? (
        posts.map((post, idx) => (
          <img
            key={idx}
            src={post.image}
            alt="Post"
            className={styles.gridItem}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${BASE_URL}/uploads/default.jpg`;
            }}
          />
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

// -------------------
// Projects Grid
function ProjectsGrid({ projects }) {
  return (
    <div className={styles.grid}>
      {projects.length > 0 ? (
        projects.map((project, idx) => (
          <img
            key={idx}
            src={project.image}
            alt="Project"
            className={styles.gridItem}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${BASE_URL}/uploads/default.jpg`;
            }}
          />
        ))
      ) : (
        <p>No projects available.</p>
      )}
    </div>
  );
}
