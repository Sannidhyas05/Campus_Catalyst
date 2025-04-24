import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../config/redux/action/postAction/index";
import FeedPostCard from "./FeedPostCard";

export default function FeedContainer() {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className={styles.feedWrapper}>
      {postState?.posts?.length > 0 ? (
        postState.posts.map((post) => (
          <FeedPostCard key={post._id} post={post} />
        ))
      ) : (
        <div className={styles.noPosts}>No posts available</div>
      )}
    </div>
  );
}
