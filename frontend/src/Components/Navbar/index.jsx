import React from "react";
import styles from "../Navbar/styles.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/config/redux/reducer/authReducer";

export default function NavBarComponent() {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(reset());
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.push("/");
          }}
        >
          Campus Catalyst
        </h1>

        <div className={styles.navBarOptionContainer}>
          {authState.profilefetched && (
            <div style={{ display: "flex", gap: "1.2rem" }}>
              <p>Hey, {authState.user.name}</p>
              <div style={{ fontWeight: "bold", cursor: "pointer" }}>
                <p>Profile</p>
              </div>
              <div style={{ fontWeight: "bold", cursor: "pointer" }}>
                <p onClick={handleLogout}>Log Out</p>
              </div>
            </div>
          )}
          {!authState.profilefetched && (
            <div
              onClick={() => {
                router.push("/login");
              }}
              className={styles.buttonJoin}
            >
              Login
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
