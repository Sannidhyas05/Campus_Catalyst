import React, { useState } from "react";
import DashboardLayout from "@/Layout/DashboardLayout";
import UserLayout from "@/Layout/UserLayout";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { createPost } from "@/config/redux/action/postAction";

export default function CreatePosts() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    content: "",
    type: "general",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.content || !formData.media)
      return alert("can't create post without content or media");

    const postData = new FormData();
    postData.append("content", formData.content);
    postData.append("type", formData.type);
    if (selectedFile) {
      postData.append("media", selectedFile);
    }

    dispatch(createPost(postData));

    setFormData({ content: "", type: "general" });
    setSelectedFile(null);
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
              required
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

            <button type="submit">Submit Post</button>
          </form>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
