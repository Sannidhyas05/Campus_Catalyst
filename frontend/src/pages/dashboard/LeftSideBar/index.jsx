import styles from "./styles.module.css";
import React from "react";
import Link from "next/link";
import {
  FaHome,
  FaSearch,
  FaProjectDiagram,
  FaUsers,
  FaInbox,
  FaPen,
  FaUser,
} from "react-icons/fa";

const navItems = [
  { href: "/dashboard", label: "Home", icon: FaHome },
  { href: "/explore", label: "Explore", icon: FaSearch },
  { href: "/projects", label: "My Projects", icon: FaProjectDiagram },
  { href: "/teams", label: "Teams", icon: FaUsers },
  { href: "/requests", label: "Requests", icon: FaInbox },
  { href: "/createPost", label: "Create Post", icon: FaPen },
  { href: "/profile", label: "Profile", icon: FaUser },
];

export default function LeftSidebar() {
  return (
    <div className={styles.sidebar}>
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} className={styles.navItem}>
          <Icon className={styles.icon} />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}
