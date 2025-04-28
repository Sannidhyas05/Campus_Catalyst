import React, { useState } from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { BASE_URL } from "@/config";
import UserLayout from "@/Layout/UserLayout";
import DashboardLayout from "@/Layout/DashboardLayout";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const authState = useSelector((state) => state.auth);
  const { user } = authState;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      // Fetch search results from backend API
      const response = await fetch(`${BASE_URL}/api/allUsers?q=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.searchContainer}>
          <h1 className={styles.title}>Search</h1>

          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for posts, projects, or users..."
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>

          <div className={styles.results}>
            {searchResults.length > 0 ? (
              searchResults.map((item, idx) => (
                <div key={idx} className={styles.resultCard}>
                  {item.type === "user" && (
                    <div>
                      <h3>{item.username}</h3>
                      <p>{item.email}</p>
                    </div>
                  )}
                  {item.type === "post" && (
                    <div>
                      <img
                        src={`${BASE_URL}/${item.media[0]?.url}`}
                        alt="Post"
                        className={styles.resultImage}
                      />
                      <p>{item.content}</p>
                    </div>
                  )}
                  {item.type === "project" && (
                    <div>
                      <img
                        src={`${BASE_URL}/${item.image}`}
                        alt="Project"
                        className={styles.resultImage}
                      />
                      <h3>{item.title}</h3>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className={styles.noResults}>No results found.</p>
            )}
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
