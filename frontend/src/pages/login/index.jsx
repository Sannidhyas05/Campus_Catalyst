import UserLayout from "@/Layout/UserLayout";
import React, { use } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../login/style.module.css";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "@/config/redux/action/authAction";
import { loginUser } from "@/config/redux/action/authAction";
import { emptyMessage } from "../../config/redux/reducer/authReducer/index";

function LoginComponent() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const [isLoginMethod, setIsLoginMethod] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Select Role");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatchEvent = useDispatch();

  const [sapId, setSapId] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard");
    }
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("dashboard");
    }
  });

  useEffect(() => {
    dispatchEvent(emptyMessage());
  }, [isLoginMethod]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRegister = () => {
    console.log("Registering");
    dispatchEvent(
      registerUser({
        sapId: sapId,
        name: name,
        email: email,
        password: password,
        role: role,
        username: username,
      })
    );
  };
  const handleLogin = () => {
    console.log("Logging in");
    dispatchEvent(
      loginUser({
        email: email,
        password: password,
      })
    );
  };

  const handleRoleSelect = (selectedRole) => {
    setSelectedRole(selectedRole);
    setRole(selectedRole);
    setDropdownOpen(false);
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainerLeft}>
            <p className={styles.cardLeftHeading}>
              {isLoginMethod ? "Sign In" : "Sign Up"}
            </p>
            <div className={styles.inputContainer}>
              {!isLoginMethod && (
                <div className={styles.inputRow}>
                  <input
                    onChange={(e) => setSapId(e.target.value)}
                    type="text"
                    placeholder="SAP ID"
                    className={styles.inputField}
                  />
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                    className={styles.inputField}
                  />
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                    className={styles.inputField}
                  />
                </div>
              )}
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
                className={styles.inputField}
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className={styles.inputField}
              />
            </div>
            {!isLoginMethod && (
              <div className={styles.dropdown} ref={dropdownRef}>
                <button
                  className={styles.dropbtn}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {role ? role : "Select Role"}
                </button>
                {dropdownOpen && (
                  <div className={styles.dropdownContent}>
                    <button onClick={() => handleRoleSelect("Student")}>
                      Student
                    </button>
                    <button onClick={() => handleRoleSelect("Teacher")}>
                      Teacher
                    </button>
                  </div>
                )}
              </div>
            )}

            <div
              onClick={() => {
                if (isLoginMethod) {
                  handleLogin();
                } else {
                  handleRegister();
                }
              }}
              className={styles.buttonwithOutline}
            >
              <p> {isLoginMethod ? "Log In" : "Sign Up"}</p>
            </div>
            <div>
              {authState.message && (
                <p style={{ color: authState.isError ? "red" : "green" }}>
                  {authState.message.message}
                </p>
              )}
            </div>
          </div>

          <div className={styles.cardContainerRight}>
            <div>
              <p>
                {" "}
                {!isLoginMethod
                  ? "Already Have an Account?"
                  : "Don't Have an Account"}
              </p>
              <div
                onClick={() => {
                  setIsLoginMethod(!isLoginMethod);
                }}
                className={styles.buttonlogin}
              >
                <p> {isLoginMethod ? "Sign Up" : "Sign In"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default LoginComponent;
