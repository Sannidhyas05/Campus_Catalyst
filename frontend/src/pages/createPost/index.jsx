import React, { useState } from "react";
import DashboardLayout from "@/Layout/DashboardLayout";
import UserLayout from "@/Layout/UserLayout";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { createPost } from "@/config/redux/action/postAction";
import { toast } from "react-hot-toast"; 

export default function CreatePosts() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    content: "",
    type: "general",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.content && !selectedFile) {
      toast.error("Can't create an empty post! Add content or an image.");
      return;
    }

    const postData = new FormData();
    postData.append("content", formData.content);
    postData.append("type", formData.type);
    if (selectedFile) {
      postData.append("media", selectedFile);
    }

    try {
      setLoading(true);
      await dispatch(createPost(postData));
      setFormData({ content: "", type: "general" });
      setSelectedFile(null);
      toast.success("Post created successfully! 🎉"); 
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again."); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.createPostContainer}>
          <h2>Create a New Post</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Content:</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post..."
              rows="5"
            />

            <label>Attach Image:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {selectedFile && (
              <div className={styles.preview}>
                <p>Preview:</p>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  style={{ width: "200px", borderRadius: "0.5rem" }}
                />
              </div>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Posting..." : "Submit Post"}
            </button>
          </form>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}


//profileId in post model was reqwuired..