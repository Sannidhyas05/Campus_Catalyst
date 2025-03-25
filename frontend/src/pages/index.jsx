import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import styles from "../styles/home.module.css";
import UserLayout from "@/Layout/UserLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.mainContainer_left}>
            <p>Campus Catalyst</p>
            <p>A student-mentor Workflow</p>
            <div
              onClick={() => router.push("/login")}
              className={styles.buttonjoin}
            >
              <p>LOGIN HERE</p>
            </div>
          </div>

          <div className={styles.mainContainer_right}>
            <Image
              src="/images/homepage.png"
              width={920}
              height={320}
              alt="Homepage Image"
            />
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
