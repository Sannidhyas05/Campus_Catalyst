import { getPosts } from "@/config/redux/action/postAction";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function dashboard() {
  const router = useRouter();
  const [isTokenThere, setTokenThere] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      router.push("/login");
    }
    setTokenThere(true);
  });

  useEffect(() => {
    if (isTokenThere) {
      dispatch(getPosts());
    }
  }, [isTokenThere]);

  return <div>dashboard</div>;
}
